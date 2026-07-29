import { useCallback, useEffect, useMemo } from "react";
import { isClipboardApiSupported, readClipboardImage } from "@/lib/clipboard";
import { MAX_FILE_SIZE_MB } from "@/sections/UploadCard";

export interface UseClipboardImageOptions {
  /** Called with a File when a supported image is found on the clipboard. */
  onImage: (file: File) => void;
  /** Called with a user-facing message for any expected failure case. */
  onError: (message: string) => void;
  /** Skip paste attempts entirely — e.g. while OCR is already running. */
  disabled?: boolean;
}

export interface UseClipboardImageResult {
  /** Whether this browser can read images from the clipboard at all. */
  isSupported: boolean;
  /** Trigger a clipboard read manually (wired to the Paste Image button). */
  pasteFromClipboard: () => Promise<void>;
}

const ERROR_MESSAGES: Record<Exclude<Awaited<ReturnType<typeof readClipboardImage>>["kind"], "image">, string> = {
  "no-image": "No image found in your clipboard.",
  "permission-denied": "Clipboard access was denied. Please paste using Ctrl+V or allow clipboard permissions.",
  unsupported: "Clipboard images aren't supported in this browser.",
  "too-large": `Clipboard image is larger than the ${MAX_FILE_SIZE_MB}MB limit.`,
};

/**
 * Wires up clipboard-image pasting: a manual trigger (the Paste Image
 * button) and a global Ctrl+V / Cmd+V listener (ignored while an input,
 * textarea, or contenteditable element is focused, so it never
 * interferes with editing the extracted text). Both paths call the same
 * `readClipboardImage()` and the same `onImage`/`onError` callbacks —
 * there's exactly one clipboard-reading implementation here, not two.
 */
export function useClipboardImage({
  onImage,
  onError,
  disabled = false,
}: UseClipboardImageOptions): UseClipboardImageResult {
  const isSupported = useMemo(() => isClipboardApiSupported(), []);

  const pasteFromClipboard = useCallback(async () => {
    if (disabled) return;

    try {
      const result = await readClipboardImage();
      if (result.kind === "image") {
        onImage(result.file);
      } else {
        onError(ERROR_MESSAGES[result.kind]);
      }
    } catch {
      onError("Something went wrong reading your clipboard.");
    }
  }, [disabled, onImage, onError]);

  useEffect(() => {
    if (!isSupported || disabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      const isPasteShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v";
      if (!isPasteShortcut) return;

      const activeElement = document.activeElement;
      const isEditingText =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);

      if (isEditingText) return;

      void pasteFromClipboard();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSupported, disabled, pasteFromClipboard]);

  return { isSupported, pasteFromClipboard };
}
