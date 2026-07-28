import { createWorker } from "tesseract.js";
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
  const worker = await createWorker("eng", 1, {
    logger: (message) => {
      if (typeof message.progress === "number") {
        onProgress?.(Math.round(message.progress * 100), formatStatus(message.status));
      }
    },
  });

  try {
    const { data } = await worker.recognize(image);
    return { text: data.text, confidence: data.confidence };
  } finally {
    await worker.terminate();
  }
}
