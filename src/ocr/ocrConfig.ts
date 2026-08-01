import { OEM, PSM } from "tesseract.js";

export type TextLayoutType = "single-line" | "paragraph" | "document" | "sparse";

/**
 * LSTM_ONLY is Tesseract's modern neural-net engine — the most accurate
 * mode for real-world printed/photographed text, and the mode this app
 * was already using (previously passed as the bare number `1` to
 * `createWorker`). This is that same value, now a named, self-documenting
 * constant instead of a magic number — verified optimal, not changed.
 */
export const OCR_ENGINE_MODE = OEM.LSTM_ONLY;

/**
 * Maps a detected layout to Tesseract's page segmentation mode. Note
 * "paragraph" covers both a single paragraph and a large block of text —
 * Tesseract's own segmentation modes don't distinguish between them
 * (both are "one contiguous block," just differing in how much of the
 * frame they fill), so there's no meaningful separate PSM for the two.
 */
const PSM_BY_LAYOUT: Record<TextLayoutType, PSM> = {
  "single-line": PSM.SINGLE_LINE, // PSM 7
  paragraph: PSM.SINGLE_BLOCK, // PSM 6 — single paragraph / large block of text
  document: PSM.AUTO, // PSM 3 — full page, including multi-column layouts
  sparse: PSM.SPARSE_TEXT, // PSM 11 — scattered labels/UI text
};

export function selectPsm(layout: TextLayoutType): PSM {
  return PSM_BY_LAYOUT[layout];
}
