/**
 * Public entry point for the OCR module. Re-exports `recognizeText` so
 * `@/services/ocr` continues to resolve exactly as it did when this was
 * a single flat file (`services/ocr.ts`) — `useOcr.ts` didn't need to
 * change at all when this module was split into `ocrConfig.ts` /
 * `ocrAnalysis.ts` / `ocrMetrics.ts` / `ocrRunner.ts`.
 */
export { recognizeText } from "./ocrRunner";
