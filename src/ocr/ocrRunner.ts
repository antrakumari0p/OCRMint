import { createWorker } from "tesseract.js";
import type { PSM } from "tesseract.js";
import { preprocessImage } from "@/services/imagePreprocess";
import type { OcrResult } from "@/types/ocr";
import { OCR_ENGINE_MODE, selectPsm } from "./ocrConfig";
import type { TextLayoutType } from "./ocrConfig";
import { classifyTextLayout, correctOrientation, detectOrientation } from "./ocrAnalysis";
import { nowMs, recordOcrMetrics } from "./ocrMetrics";

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
 * Pipeline: orientation check (Tesseract's own OSD, corrects 90°/180°/270°
 * rotation) → adaptive preprocessing (`services/imagePreprocess.ts`) →
 * automatic page-segmentation-mode selection — reusing preprocessing's
 * own image analysis rather than re-scanning the image — → recognition
 * with that PSM and the LSTM engine. Every step degrades gracefully on
 * failure instead of blocking OCR: a failed orientation check just skips
 * rotation, and failed preprocessing falls back to the original image
 * with the general-purpose "document" PSM.
 *
 * Note: Tesseract's own engine/language files (and, when orientation
 * detection runs, its separate OSD model) are fetched from its CDN the
 * first time they're used, and cached by the browser afterward. That's
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
  const totalStart = nowMs();
  const imageLoadStart = nowMs();

  let workingSource: Blob = image;
  let rotationDegrees = 0;

  const orientation = await detectOrientation(image);
  if (orientation) {
    try {
      workingSource = await correctOrientation(image, orientation.correctionDegrees);
      rotationDegrees = orientation.correctionDegrees;
    } catch {
      workingSource = image;
      rotationDegrees = 0;
    }
  }
  const imageLoadMs = nowMs() - imageLoadStart;

  const preprocessStart = nowMs();
  let ocrInput: Blob = workingSource;
  let psm: PSM = selectPsm("document");
  let textLayout: TextLayoutType = "document";

  try {
    const { blob, analysis } = await preprocessImage(workingSource);
    ocrInput = blob;
    textLayout = classifyTextLayout(analysis);
    psm = selectPsm(textLayout);
  } catch {
    ocrInput = workingSource;
  }
  const preprocessingMs = nowMs() - preprocessStart;

  const ocrStart = nowMs();
  const worker = await createWorker("eng", OCR_ENGINE_MODE, {
    logger: (message) => {
      if (typeof message.progress === "number") {
        onProgress?.(Math.round(message.progress * 100), formatStatus(message.status));
      }
    },
  });

  try {
    await worker.setParameters({ tessedit_pageseg_mode: psm });
    const { data } = await worker.recognize(ocrInput);
    const ocrMs = nowMs() - ocrStart;
    const totalMs = nowMs() - totalStart;

    recordOcrMetrics({
      textLayout,
      psm,
      oem: OCR_ENGINE_MODE,
      rotationDegrees,
      confidence: typeof data.confidence === "number" ? data.confidence : null,
      imageLoadMs,
      preprocessingMs,
      ocrMs,
      totalMs,
    });

    return { text: data.text, confidence: data.confidence };
  } finally {
    await worker.terminate();
  }
}
