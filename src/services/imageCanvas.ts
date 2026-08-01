/**
 * Low-level canvas/image plumbing shared by `imageAnalysis.ts` and
 * `imagePreprocess.ts`. No analysis logic, no enhancement logic, and no
 * OCR/UI logic lives here — factored out once so neither of those
 * modules duplicates image loading or canvas setup.
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function loadImage(source: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(source);
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    image.src = url;
  });
}

export interface DrawOptions {
  /** Fills the canvas white before drawing — composites out any transparency. */
  fillWhite?: boolean;
}

export function drawImageToCanvas(
  image: HTMLImageElement,
  width: number,
  height: number,
  options: DrawOptions = {}
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  // willReadFrequently hints the browser to optimize for repeated
  // getImageData calls, which both analysis and preprocessing do.
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (options.fillWhite) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(image, 0, 0, width, height);

  return { canvas, ctx };
}

/** Scales down to fit within maxDimension on the longer side, preserving aspect ratio; never upscales. */
export function computeDownscaledDimensions(
  width: number,
  height: number,
  maxDimension: number
): { width: number; height: number } {
  const longerSide = Math.max(width, height);
  if (longerSide <= maxDimension) return { width, height };

  const scale = maxDimension / longerSide;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png"): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to export canvas"));
    }, type);
  });
}

/** Releases a canvas's backing pixel buffer once its Blob/ImageData has been extracted. */
export function destroyCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = 0;
  canvas.height = 0;
}

/**
 * Rotates an image by a multiple of 90 degrees and returns the result as
 * a Blob. Used by orientation correction (services/ocr/ocrAnalysis.ts) —
 * lives here rather than there since it's generic canvas plumbing, not
 * OCR-specific logic.
 */
export async function rotateImage(image: HTMLImageElement, degrees: 90 | 180 | 270): Promise<Blob> {
  const swapDimensions = degrees === 90 || degrees === 270;
  const canvas = document.createElement("canvas");
  canvas.width = swapDimensions ? image.naturalHeight : image.naturalWidth;
  canvas.height = swapDimensions ? image.naturalWidth : image.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  try {
    return await canvasToBlob(canvas);
  } finally {
    destroyCanvas(canvas);
  }
}
