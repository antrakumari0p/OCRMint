export type OcrStatus = "idle" | "loading" | "success" | "error";

export interface OcrProgress {
  status: OcrStatus;
  /** 0–100 */
  percent: number;
  /** Human-readable current step, e.g. "Recognizing text…" */
  message?: string;
}

export interface OcrResult {
  text: string;
  /** 0–100, when the OCR engine reports one. */
  confidence?: number;
}

export interface OcrError {
  message: string;
  cause?: unknown;
}

export interface UseOcrResult {
  image: File | null;
  text: string;
  loading: boolean;
  error: OcrError | null;
  progress: OcrProgress;
  /** Sets the image and kicks off recognition. */
  extractText: (image: File) => Promise<void>;
  /** Overwrites the current text — backs the editable result textarea. */
  updateText: (value: string) => void;
  /** Resets image, text, error, and progress to their initial state. */
  clear: () => void;
  /** Copies the current text to the clipboard. */
  copy: () => Promise<void>;
  /** Downloads the current text as a .txt file. */
  downloadTxt: () => void;
  /** Downloads the current text as a .docx file. */
  downloadDocx: () => Promise<void>;
}
