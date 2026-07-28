import type { OcrResult } from "@/types/ocr";

/**
 * The one place that will talk to an actual OCR engine (Tesseract.js or
 * otherwise). Deliberately not implemented yet — this sprint is
 * architecture only. Throws rather than faking a result, so `useOcr`'s
 * error state is exercised honestly instead of the UI silently "working"
 * with fabricated text.
 *
 * TODO: integrate Tesseract.js (or an equivalent engine) here. Suggested
 * shape once wired:
 *
 *   const worker = await createWorker();
 *   worker.setProgressHandler(({ progress }) => onProgress?.(Math.round(progress * 100)));
 *   const { data } = await worker.recognize(image);
 *   await worker.terminate();
 *   return { text: data.text, confidence: data.confidence };
 */
export async function recognizeText(
  image: File,
  onProgress?: (percent: number) => void
): Promise<OcrResult> {
  void image;
  void onProgress;
  throw new Error("OCR engine not yet integrated");
}
