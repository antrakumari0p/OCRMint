import { createWorker } from "tesseract.js";
import { preprocessImage } from "@/services/imagePreprocess";
import type { OcrResult } from "@/types/ocr";

/** Turns Tesseract's lowercase status strings into friendlier progress copy. */
function formatStatus(status: string): string {
  if (!status) return "Processing…";
  return status.charAt(0).toUpperCase() + status.slice(1) + "…";
}

/**
 * Runs OCR entirely in the browser via Tesseract.js (WebAssembly, in a Web
 * Worker) — there is no backend and no API call. The image and the
 * extracted text never leave the device.
 *
 * Before recognition, the image is run through `preprocessImage` (white
 * background compositing, grayscale, contrast/brightness correction, and
 * upscaling for small images) so Tesseract receives a cleaner input than
 * the raw upload. If preprocessing fails for any reason, OCR still runs
 * on the original image rather than blocking — accuracy may suffer, but
 * the feature never breaks because of it. Either way, the original
 * File passed in here is untouched; `useOcr.ts` keeps using it for the
 * preview regardless of what OCR actually sees.
 *
 * Note: Tesseract's own engine/language files are fetched from its CDN
 * the first time OCR runs (and cached by the browser afterward). That's
 * static asset loading — the same category as this project's Google
 * Fonts request — not a data upload; no image or text data is ever sent
 * anywhere.
 *
 * A fresh worker is created per call and terminated in `finally`, which
 * keeps this function stateless and avoids stale-closure bugs with the
 * per-call `onProgress` callback (a persistent worker's logger is fixed
 * at creation time, which wouldn't be able to target a different caller's
 * progress handler on every extraction).
 */
export async function recognizeText(
  image: File,
  onProgress?: (percent: number, message?: string) => void
): Promise<OcrResult> {
  let ocrInput: Blob = image;
  try {
    ocrInput = (await preprocessImage(image)).blob;;
  } catch {
    ocrInput = image;
  }

  const worker = await createWorker("eng", 1, {
    logger: (message) => {
      if (typeof message.progress === "number") {
        onProgress?.(Math.round(message.progress * 100), formatStatus(message.status));
      }
    },
  });

  try {
    const { data } = await worker.recognize(ocrInput);
    return { text: data.text, confidence: data.confidence };
  } finally {
    await worker.terminate();
  }
}
