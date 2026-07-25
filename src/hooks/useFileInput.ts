import { useCallback, useRef } from "react";
import type { ChangeEvent, RefObject } from "react";

export interface UseFileInputResult {
  inputRef: RefObject<HTMLInputElement>;
  openFilePicker: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Shared "click to open the OS file picker, then forward the selected
 * File up via a callback" logic. Both the Upload Image CTA button and the
 * drag-and-drop UploadCard render their own hidden `<input type="file">`
 * (they're genuinely two separate trigger points), but share this hook so
 * the open/select logic itself isn't duplicated.
 */
export function useFileInput(onFileSelect?: (file: File) => void): UseFileInputResult {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) onFileSelect?.(file);
      // Reset so selecting the same file again still fires a change event.
      event.target.value = "";
    },
    [onFileSelect]
  );

  return { inputRef, openFilePicker, handleInputChange };
}
