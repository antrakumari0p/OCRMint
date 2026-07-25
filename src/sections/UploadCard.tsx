import { useId, useState } from "react";
import type { DragEvent, SVGProps } from "react";
import { cn } from "@/lib/cn";
import { useFileInput } from "@/hooks/useFileInput";

/**
 * Single source of truth for accepted formats and size limit — used for
 * both file inputs' `accept` attribute (this one and the Upload Image CTA
 * in `Hero`) and the label copy below.
 */
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const ACCEPTED_FILE_LABEL = "PNG, JPG, JPEG, WEBP";
export const MAX_FILE_SIZE_MB = 10;

export interface UploadCardProps {
  /**
   * Called with the selected file, whether chosen by clicking the card or
   * dropped onto it. Not wired to anything yet — a future sprint can pass
   * a handler here (e.g. to kick off OCR) without touching this component.
   */
  onFileSelect?: (file: File) => void;
}

function CloudUploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 16 8a4.5 4.5 0 0 1 1 8.9" />
      <path d="M12 20v-7M9.5 15.5 12 13l2.5 2.5" />
    </svg>
  );
}

/**
 * The focal drop target on the homepage. The whole card is a single
 * semantic `<button>` (no nested interactive elements) — clicking it or
 * pressing Enter/Space opens the file picker, and it also accepts a
 * dropped file directly. Purely presentational otherwise: it tracks drag
 * state for visual feedback and forwards a selected File up via
 * `onFileSelect`, but performs no validation, upload, or processing.
 */
export function UploadCard({ onFileSelect }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { inputRef, openFilePicker, handleInputChange } = useFileInput(onFileSelect);
  const headingId = useId();

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect?.(file);
  };

  return (
    <button
      type="button"
      onClick={openFilePicker}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-labelledby={headingId}
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-xl border-2 border-dashed bg-background p-8 text-center shadow-sm sm:p-10",
        "transition duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isDragging
          ? "scale-[1.01] border-primary bg-surface shadow-md"
          : "border-primary/30 hover:border-primary/60 hover:shadow-md"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES.join(",")}
        onChange={handleInputChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      <span className="flex h-14 w-14 items-center justify-center text-primary" aria-hidden="true">
        <CloudUploadIcon className="h-full w-full" />
      </span>

      <p id={headingId} className="font-heading text-lg font-semibold text-text-primary">
        Drag &amp; Drop your image here
      </p>

      <p className="font-body text-sm text-text-secondary">
        {ACCEPTED_FILE_LABEL} up to {MAX_FILE_SIZE_MB}MB
      </p>
    </button>
  );
}
