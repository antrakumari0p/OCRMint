import { analyzeLoadedImage, HIGH_CONTRAST_STDDEV_THRESHOLD } from "./imageAnalysis";
import type { ImageAnalysis } from "./imageAnalysis";
import { canvasToBlob, clamp, destroyCanvas, drawImageToCanvas, loadImage } from "./imageCanvas";

/**
 * Adaptive image enhancement pipeline, run before an image is sent to
 * Tesseract. Entirely browser-native (Canvas 2D) — no external
 * libraries, no WASM, no AI. Every enhancement amount here is derived
 * from `analyzeLoadedImage`'s findings (see imageAnalysis.ts), so an
 * already-clean scan is barely touched while a dark, low-contrast phone
 * photo gets meaningfully more correction — the same fixed filters are
 * never applied to every image.
 *
 * Deliberate reordering vs. a literal Step 6 → 7 → 8 reading (adaptive
 * threshold, then edge enhancement, then noise reduction): here, noise
 * reduction and edge enhancement run on the continuous-tone grayscale
 * image, and adaptive thresholding (binarization) runs LAST, immediately
 * before export. Denoising/sharpening an already-binarized image
 * discards the graduated tone information those operations need to tell
 * genuine strokes from speckle — this is why conventional document-
 * scanning pipelines denoise/sharpen before binarizing. Every operation
 * asked for is still here; only the execution order changed, in service
 * of actual OCR accuracy.
 */

const TARGET_TEXT_LINE_HEIGHT_PX = 34;
const MIN_TEXT_LINE_HEIGHT_TO_UPSCALE_PX = 22;
const MAX_UPSCALE_FACTOR = 2.5;

const BRIGHTNESS_REFERENCE = 128; // "ideal" mid-gray target
const MAX_BRIGHTNESS_BOOST = 55; // clamp — never overexpose

const HIGH_CONTRAST_BOOST = 10; // small nudge even for already-good images
const LOW_CONTRAST_MAX_BOOST = 60;

const BLUR_RADIUS_PX = 2; // small — for the combined denoise/sharpen pass only
const MAX_DENOISE_STRENGTH = 0.55;
const MAX_SHARPEN_AMOUNT = 0.5;

const THRESHOLD_RADIUS_RATIO = 0.02; // relative to the image's shorter side
const THRESHOLD_MIN_RADIUS = 10;
const THRESHOLD_MAX_RADIUS = 35;
const THRESHOLD_BIAS = 10; // moderate — preserves thin serif strokes

const preprocessCache = new WeakMap<Blob, Promise<Blob>>();

/** Upscales only if estimated text is small; never upscales otherwise. */
function computeTargetDimensions(analysis: ImageAnalysis): { width: number; height: number } {
  const { width, height, estimatedTextLineHeight } = analysis;

  if (estimatedTextLineHeight <= 0 || estimatedTextLineHeight >= MIN_TEXT_LINE_HEIGHT_TO_UPSCALE_PX) {
    return { width, height };
  }

  const factor = clamp(TARGET_TEXT_LINE_HEIGHT_PX / estimatedTextLineHeight, 1, MAX_UPSCALE_FACTOR);
  return { width: Math.round(width * factor), height: Math.round(height * factor) };
}

/** Dark images get boosted more; already-bright images are left alone. */
function computeAdaptiveBrightnessBoost(averageBrightness: number): number {
  if (averageBrightness >= BRIGHTNESS_REFERENCE) return 0;
  const deficit = BRIGHTNESS_REFERENCE - averageBrightness;
  return clamp(deficit * 0.45, 0, MAX_BRIGHTNESS_BOOST);
}

/** Low-contrast images get boosted more; already-high-contrast images get only a small nudge. */
function computeAdaptiveContrastAmount(analysis: ImageAnalysis): number {
  if (analysis.isHighContrast) return HIGH_CONTRAST_BOOST;
  const deficit = HIGH_CONTRAST_STDDEV_THRESHOLD - analysis.averageContrast;
  return clamp(HIGH_CONTRAST_BOOST + deficit * 1.1, HIGH_CONTRAST_BOOST, LOW_CONTRAST_MAX_BOOST);
}

function toGrayscaleValue(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function computeContrastFactor(amount: number): number {
  return (259 * (amount + 255)) / (255 * (259 - amount));
}

/**
 * Fused grayscale + adaptive brightness + adaptive contrast in a single
 * pixel pass, rather than three separate full-image passes — a
 * meaningful performance win with no change in the actual math.
 */
function applyToneAdjustments(imageData: ImageData, brightnessBoost: number, contrastAmount: number): void {
  const data = imageData.data;
  const contrastFactor = computeContrastFactor(contrastAmount);

  for (let i = 0; i < data.length; i += 4) {
    let value = toGrayscaleValue(data[i], data[i + 1], data[i + 2]);
    value += brightnessBoost;
    value = contrastFactor * (value - 128) + 128;
    value = clamp(value, 0, 255);
    data[i] = data[i + 1] = data[i + 2] = value;
  }
}

/** Summed-area table over the (grayscale) red channel — O(1) local-mean queries at any radius afterward. */
function buildIntegralImage(imageData: ImageData): Float64Array {
  const { width, height, data } = imageData;
  const integral = new Float64Array((width + 1) * (height + 1));
  const stride = width + 1;

  for (let y = 0; y < height; y++) {
    let rowSum = 0;
    for (let x = 0; x < width; x++) {
      rowSum += data[(y * width + x) * 4];
      integral[(y + 1) * stride + (x + 1)] = integral[y * stride + (x + 1)] + rowSum;
    }
  }

  return integral;
}

function queryLocalMean(
  integral: Float64Array,
  width: number,
  height: number,
  x: number,
  y: number,
  radius: number
): number {
  const x0 = Math.max(0, x - radius);
  const y0 = Math.max(0, y - radius);
  const x1 = Math.min(width - 1, x + radius);
  const y1 = Math.min(height - 1, y + radius);
  const stride = width + 1;

  const sum =
    integral[(y1 + 1) * stride + (x1 + 1)] -
    integral[y0 * stride + (x1 + 1)] -
    integral[(y1 + 1) * stride + x0] +
    integral[y0 * stride + x0];

  const area = (x1 - x0 + 1) * (y1 - y0 + 1);
  return sum / area;
}

/**
 * Combined noise reduction + edge enhancement in one pass: both are
 * "move toward or away from the local average" operations, so they
 * share one blur computation. `noiseLevel` drives a signed adjustment —
 * noisier images net-blur (denoise dominates), cleaner images net-
 * sharpen — which is also how "don't amplify noise" is enforced: the
 * sharpen term is scaled down exactly when there's more noise it could
 * amplify.
 */
function applyAdaptiveDenoiseAndSharpen(imageData: ImageData, noiseLevel: number): void {
  const { width, height, data } = imageData;

  const denoiseStrength = clamp(noiseLevel * MAX_DENOISE_STRENGTH, 0, MAX_DENOISE_STRENGTH);
  const sharpenAmount = clamp((1 - noiseLevel) * MAX_SHARPEN_AMOUNT, 0, MAX_SHARPEN_AMOUNT);
  const netFactor = sharpenAmount - denoiseStrength;
  if (netFactor === 0) return;

  const integral = buildIntegralImage(imageData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const original = data[i];
      const blurred = queryLocalMean(integral, width, height, x, y, BLUR_RADIUS_PX);
      const value = clamp(original + netFactor * (original - blurred), 0, 255);
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  }
}

/**
 * Local-mean adaptive thresholding — the standard technique for document
 * images with uneven lighting, and a real step up from one global fixed
 * contrast/threshold. The radius scales with image size (so it behaves
 * consistently for a phone photo or a scanned page) and a moderate bias
 * keeps thin serif strokes from disappearing into the background.
 */
function applyAdaptiveThreshold(imageData: ImageData): void {
  const { width, height, data } = imageData;
  const radius = clamp(
    Math.round(Math.min(width, height) * THRESHOLD_RADIUS_RATIO),
    THRESHOLD_MIN_RADIUS,
    THRESHOLD_MAX_RADIUS
  );

  const integral = buildIntegralImage(imageData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const localMean = queryLocalMean(integral, width, height, x, y, radius);
      const value = data[i] > localMean - THRESHOLD_BIAS ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  }
}

async function runAdaptivePipeline(source: Blob): Promise<Blob> {
  const image = await loadImage(source);
  const analysis = analyzeLoadedImage(image); // reuses the already-decoded image — no second decode
  const { width, height } = computeTargetDimensions(analysis);

  const { canvas, ctx } = drawImageToCanvas(image, width, height, { fillWhite: analysis.hasTransparency });

  try {
    const imageData = ctx.getImageData(0, 0, width, height);

    applyToneAdjustments(
      imageData,
      computeAdaptiveBrightnessBoost(analysis.averageBrightness),
      computeAdaptiveContrastAmount(analysis)
    );
    applyAdaptiveDenoiseAndSharpen(imageData, analysis.noiseLevel);
    applyAdaptiveThreshold(imageData);

    ctx.putImageData(imageData, 0, 0);

    return await canvasToBlob(canvas);
  } finally {
    destroyCanvas(canvas);
  }
}

/**
 * Analyzes `source`, then runs an adaptive enhancement pipeline suited
 * to what was found, and returns the result as a Blob. Safe to call more
 * than once with the same File/Blob — repeat calls return the same
 * in-flight/cached result rather than reprocessing.
 */
export function preprocessImage(source: File | Blob): Promise<Blob> {
  const cached = preprocessCache.get(source);
  if (cached) return cached;

  const result = runAdaptivePipeline(source);
  preprocessCache.set(source, result);
  return result;
}
