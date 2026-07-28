import { useCallback, useMemo, useState } from "react";
import { recognizeText } from "@/services/ocr";
import { createDocxBlob } from "@/services/docx";
import type { OcrError, OcrProgress, UseOcrResult } from "@/types/ocr";

const IDLE_PROGRESS: OcrProgress = { status: "idle", percent: 0 };

function toOcrError(cause: unknown): OcrError {
  if (cause instanceof Error) return { message: cause.message, cause };
  return { message: "Something went wrong.", cause };
}

/**
 * Owns OCR workflow state (selected image, extracted text, progress,
 * error) and the actions that operate on it. `extractText` delegates the
 * actual recognition to `services/ocr.ts`, which runs Tesseract.js
 * entirely in the browser. Keeping the state machine here (rather than
 * inside a component) means the same hook can back both the homepage
 * upload flow and a dedicated results view without duplicating logic.
 */
export function useOcr(): UseOcrResult {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState<OcrError | null>(null);
  const [progress, setProgress] = useState<OcrProgress>(IDLE_PROGRESS);

  const extractText = useCallback(async (file: File) => {
    setImage(file);
    setText("");
    setError(null);
    setProgress({ status: "loading", percent: 0, message: "Starting OCR…" });

    try {
      const result = await recognizeText(file, (percent, message) =>
        setProgress({ status: "loading", percent, message: message ?? "Recognizing text…" })
      );
      setText(result.text);
      setProgress({ status: "success", percent: 100, message: "Done" });
    } catch (cause) {
      setError(toOcrError(cause));
      setProgress({ status: "error", percent: 0, message: "Something went wrong" });
    }
  }, []);

  const updateText = useCallback((value: string) => {
    setText(value);
  }, []);

  const clear = useCallback(() => {
    setImage(null);
    setText("");
    setError(null);
    setProgress(IDLE_PROGRESS);
  }, []);

  const copy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (cause) {
      setError(toOcrError(cause));
    }
  }, [text]);

  const downloadTxt = useCallback(() => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ocrmint-result.txt";
    link.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const downloadDocx = useCallback(async () => {
    if (!text) return;
    try {
      const blob = await createDocxBlob(text);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ocrmint-result.docx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (cause) {
      setError(toOcrError(cause));
    }
  }, [text]);

  const loading = progress.status === "loading";

  return useMemo(
    () => ({
      image,
      text,
      loading,
      error,
      progress,
      extractText,
      updateText,
      clear,
      copy,
      downloadTxt,
      downloadDocx,
    }),
    [image, text, loading, error, progress, extractText, updateText, clear, copy, downloadTxt, downloadDocx]
  );
}
