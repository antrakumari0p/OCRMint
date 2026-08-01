import type { PSM } from "tesseract.js";
import type { TextLayoutType } from "./ocrConfig";

export interface OcrRunMetrics {
  textLayout: TextLayoutType;
  psm: PSM;
  oem: number;
  /** 0 if no rotation was applied. */
  rotationDegrees: number;
  /** Tesseract's own recognition confidence (0–100), if reported. */
  confidence: number | null;
  /** Includes orientation detection — the first real work done on the raw image, before preprocessing. */
  imageLoadMs: number;
  preprocessingMs: number;
  ocrMs: number;
  totalMs: number;
}

/**
 * Not exposed to any UI component this sprint — this is purely the
 * "prepare for future UI" hook the confidence-tracking requirement asks
 * for. A later sprint can read this (e.g. for a debug panel) without any
 * change to how OCR runs.
 */
let lastMetrics: OcrRunMetrics | null = null;

export function nowMs(): number {
  return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
}

/**
 * Records the metrics for one OCR run and, in development only, logs
 * them to the console. `import.meta.env.DEV` is replaced with the
 * literal `false` in production builds, so this whole block (including
 * the log strings) is dead-code-eliminated from what ships — nothing
 * appears in production, not even inert code.
 */
export function recordOcrMetrics(metrics: OcrRunMetrics): void {
  lastMetrics = metrics;

  if (import.meta.env.DEV) {
    console.groupCollapsed("[OCRMint] OCR run");
    console.log("Text layout:", metrics.textLayout);
    console.log("PSM:", metrics.psm);
    console.log("OEM:", metrics.oem);
    console.log("Rotation applied:", metrics.rotationDegrees, "degrees");
    console.log("Confidence:", metrics.confidence);
    console.log("Image load (incl. orientation check):", metrics.imageLoadMs.toFixed(1), "ms");
    console.log("Preprocessing:", metrics.preprocessingMs.toFixed(1), "ms");
    console.log("OCR:", metrics.ocrMs.toFixed(1), "ms");
    console.log("Total:", metrics.totalMs.toFixed(1), "ms");
    console.groupEnd();
  }
}

/** For future UI/debugging — not surfaced to any component yet. */
export function getLastOcrMetrics(): OcrRunMetrics | null {
  return lastMetrics;
}
