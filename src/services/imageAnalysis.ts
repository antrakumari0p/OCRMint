import { computeDownscaledDimensions, destroyCanvas, drawImageToCanvas, loadImage } from "./imageCanvas";

export interface ImageAnalysis {
  /** Original image width/height — never the analysis copy's dimensions. */
  width: number;
  height: number;
  /** 0–255. */
  averageBrightness: number;
  /** Standard deviation of luminance — higher means more tonal spread. */
  averageContrast: number;
  isHighContrast: boolean;
  /** Estimated typical text-line height, in pixels, scaled to the original image's resolution. */
  estimatedTextLineHeight: number;
  /** 0–1; higher means more visible speckle/compression noise. */
  noiseLevel: number;
  hasTransparency: boolean;
}

/** Analysis runs on a small downsampled copy purely for speed — these stats don't need full resolution. */
const ANALYSIS_MAX_DIMENSION = 400;

/** stddev of luminance above this is treated as "already high contrast" — empirical. */
export const HIGH_CONTRAST_STDDEV_THRESHOLD = 55;

function computeLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Samples every 7th pixel's alpha channel — a full scan isn't needed to detect transparency. */
function detectTransparency(data: Uint8ClampedArray): boolean {
  for (let i = 3; i < data.length; i += 4 * 7) {
    if (data[i] < 250) return true;
  }
  return false;
}

function computeBrightnessAndContrast(data: Uint8ClampedArray): { brightness: number; contrast: number } {
  let sum = 0;
  let sumSquares = 0;
  const pixelCount = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const luminance = computeLuminance(data[i], data[i + 1], data[i + 2]);
    sum += luminance;
    sumSquares += luminance * luminance;
  }

  const mean = sum / pixelCount;
  const variance = Math.max(sumSquares / pixelCount - mean * mean, 0);
  return { brightness: mean, contrast: Math.sqrt(variance) };
}

/**
 * Average absolute difference between horizontally adjacent pixels, as a
 * lightweight proxy for noise. This is a deliberate simplification: it
 * can't fully distinguish genuine text edges from speckle/compression
 * noise the way a proper noise-estimation algorithm would, but it's
 * cheap, browser-native, and correlates well enough with visibly noisy
 * images to drive an adaptive denoise/sharpen decision.
 */
function computeNoiseLevel(data: Uint8ClampedArray, width: number, height: number): number {
  let totalDiff = 0;
  let samples = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 1; x < width; x++) {
      const i = (y * width + x) * 4;
      totalDiff += Math.abs(data[i] - data[i - 4]);
      samples++;
    }
  }

  const averageDiff = samples > 0 ? totalDiff / samples : 0;
  // Empirically, average adjacent-pixel differences above ~18 (of 255)
  // indicate visible speckle/compression noise; normalize against that
  // so 1.0 means "clearly noisy" rather than an arbitrary raw number.
  return Math.min(Math.max(averageDiff / 18, 0), 1);
}

/**
 * Estimates a typical text line's height in pixels via a horizontal
 * projection profile — a classical, lightweight document-analysis
 * technique (no ML involved): rows containing text are noticeably darker
 * on average than the whitespace between lines, so the median length of
 * contiguous "dark" row runs approximates one line's height. Returns the
 * *median* run length specifically so a few outlier dark rows (a photo's
 * shadow, a ruled margin line) don't skew the estimate.
 */
function estimateTextLineHeight(data: Uint8ClampedArray, width: number, height: number): number {
  const rowDarkness = new Array<number>(height);

  for (let y = 0; y < height; y++) {
    let rowSum = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      rowSum += 255 - computeLuminance(data[i], data[i + 1], data[i + 2]);
    }
    rowDarkness[y] = rowSum / width;
  }

  const meanDarkness = rowDarkness.reduce((total, value) => total + value, 0) / height;
  const threshold = meanDarkness * 1.15;

  const runLengths: number[] = [];
  let currentRun = 0;
  for (let y = 0; y < height; y++) {
    if (rowDarkness[y] > threshold) {
      currentRun++;
    } else if (currentRun > 0) {
      runLengths.push(currentRun);
      currentRun = 0;
    }
  }
  if (currentRun > 0) runLengths.push(currentRun);

  if (runLengths.length === 0) return height; // no clear text bands found — treat as "large enough"

  runLengths.sort((a, b) => a - b);
  return runLengths[Math.floor(runLengths.length / 2)];
}

/**
 * Analyzes an already-loaded image and returns its stats without
 * modifying any pixels. Exposed separately from `analyzeImage` so
 * `imagePreprocess.ts` can reuse an image it already decoded, rather
 * than decoding the same source twice.
 */
export function analyzeLoadedImage(image: HTMLImageElement): ImageAnalysis {
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  const { width: analysisWidth, height: analysisHeight } = computeDownscaledDimensions(
    width,
    height,
    ANALYSIS_MAX_DIMENSION
  );

  const { canvas, ctx } = drawImageToCanvas(image, analysisWidth, analysisHeight);

  try {
    const { data } = ctx.getImageData(0, 0, analysisWidth, analysisHeight);

    const hasTransparency = detectTransparency(data);
    const { brightness, contrast } = computeBrightnessAndContrast(data);
    const noiseLevel = computeNoiseLevel(data, analysisWidth, analysisHeight);
    const lineHeightOnAnalysisScale = estimateTextLineHeight(data, analysisWidth, analysisHeight);
    const scaleToOriginal = analysisWidth > 0 ? width / analysisWidth : 1;

    return {
      width,
      height,
      averageBrightness: brightness,
      averageContrast: contrast,
      isHighContrast: contrast > HIGH_CONTRAST_STDDEV_THRESHOLD,
      estimatedTextLineHeight: lineHeightOnAnalysisScale * scaleToOriginal,
      noiseLevel,
      hasTransparency,
    };
  } finally {
    destroyCanvas(canvas);
  }
}

/**
 * Analyzes an image before any pixels are modified, so preprocessing can
 * make per-image decisions instead of applying identical filters to
 * every upload. Runs on a small downsampled copy purely for speed —
 * brightness/contrast/noise are scale-invariant, and
 * `estimatedTextLineHeight` is scaled back up to the original image's
 * resolution before being returned, so callers never need to know
 * analysis happened on a smaller copy.
 */
export async function analyzeImage(source: Blob): Promise<ImageAnalysis> {
  const image = await loadImage(source);
  return analyzeLoadedImage(image);
}
