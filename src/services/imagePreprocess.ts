/**
 * Client-side image preprocessing pipeline, run before an image is sent
 * to Tesseract. Entirely browser-native (Canvas 2D) — no external
 * libraries, no WASM, no AI. Used only by `services/ocr.ts`; nothing
 * here talks to Tesseract, and no UI component performs any of this
 * itself.
 *
 * Pipeline: composite onto a white background (removes PNG transparency,
 * upscales small images in the same draw) → grayscale → conditional
 * brightness boost for dark images → moderate contrast boost → export as
 * a PNG Blob. The *original* File/Blob passed in is never mutated —
 * everything happens on a scratch canvas, and only the processed output
 * is returned. Callers (see `services/ocr.ts`) keep using the original
 * for anything else (e.g. the preview).
 */

const TARGET_MIN_WIDTH = 1200;
const DARK_BRIGHTNESS_THRESHOLD = 110; // 0–255; below this, the image is considered "dark"
const BRIGHTNESS_BOOST_AMOUNT = 25; // 0–255; added to each channel for dark images
const CONTRAST_AMOUNT = 35; // -255..255; moderate boost, avoids clipping

/** Avoids reprocessing the same File/Blob if it's ever passed in more than once. */
const preprocessCache = new WeakMap<Blob, Promise<Blob>>();

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function loadImage(source: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(source);
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for preprocessing"));
    };
    image.src = url;
  });
}

/** Scales proportionally up to TARGET_MIN_WIDTH if narrower; never stretches, never shrinks. */
function computeTargetDimensions(width: number, height: number): { width: number; height: number } {
  if (width >= TARGET_MIN_WIDTH) return { width, height };
  const scale = TARGET_MIN_WIDTH / width;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/**
 * Draws the image onto a white-filled canvas at the target size in one
 * pass — this is what removes PNG transparency (white paints first,
 * image composites on top) and performs the upscale (high-quality
 * smoothing), without a second canvas or an extra copy.
 */
function drawOnWhiteBackground(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  return { canvas, ctx };
}

/** Perceptual (luminance-weighted) grayscale, mutating imageData in place. */
function toGrayscale(imageData: ImageData): void {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
}

/** Average channel value across the image — used to decide if a brightness boost is needed. */
function computeAverageBrightness(imageData: ImageData): number {
  const data = imageData.data;
  let sum = 0;
  const pixelCount = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    sum += data[i]; // already grayscale at this point, so R === G === B
  }
  return sum / pixelCount;
}

/** Adds a flat amount to every channel, clamped to avoid overexposure. */
function applyBrightness(imageData: ImageData, amount: number): void {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + amount, 0, 255);
    data[i + 1] = clamp(data[i + 1] + amount, 0, 255);
    data[i + 2] = clamp(data[i + 2] + amount, 0, 255);
  }
}

/** Standard contrast-around-midpoint formula, clamped to avoid clipping text to pure black/white. */
function applyContrast(imageData: ImageData, amount: number): void {
  const factor = (259 * (amount + 255)) / (255 * (259 - amount));
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128, 0, 255);
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128, 0, 255);
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128, 0, 255);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to export processed canvas"));
    }, "image/png");
  });
}

async function runPreprocessPipeline(source: Blob): Promise<Blob> {
  const image = await loadImage(source);
  const { width, height } = computeTargetDimensions(image.naturalWidth, image.naturalHeight);

  const { canvas, ctx } = drawOnWhiteBackground(image, width, height);

  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    toGrayscale(imageData);

    if (computeAverageBrightness(imageData) < DARK_BRIGHTNESS_THRESHOLD) {
      applyBrightness(imageData, BRIGHTNESS_BOOST_AMOUNT);
    }

    applyContrast(imageData, CONTRAST_AMOUNT);

    ctx.putImageData(imageData, 0, 0);

    return await canvasToBlob(canvas);
  } finally {
    // Release the canvas's backing pixel buffer; nothing else references
    // this canvas (it was never attached to the DOM), so it's now
    // eligible for garbage collection.
    canvas.width = 0;
    canvas.height = 0;
  }
}

/**
 * Runs the enhancement pipeline on `source` and returns the processed
 * image as a Blob. Safe to call more than once with the same File/Blob
 * — repeat calls return the same in-flight/cached result rather than
 * reprocessing.
 */
export function preprocessImage(source: File | Blob): Promise<Blob> {
  const cached = preprocessCache.get(source);
  if (cached) return cached;

  const result = runPreprocessPipeline(source);
  preprocessCache.set(source, result);
  return result;
}
