import { useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Single source of truth for accepted formats and size limit — used for
 * both the file input's `accept` attribute and the label copy below, and
 * ready for Sprint 4 to reuse for real validation.
 */
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const ACCEPTED_FILE_LABEL = "PNG • JPG • JPEG • WEBP";
export const MAX_FILE_SIZE_MB = 20;

export interface UploadCardProps {
  /**
   * Called with the selected file, whether chosen via the file picker or
   * dropped onto the card. Not wired to anything yet — Sprint 4 can pass
   * a handler here (e.g. to kick off OCR) without touching this component.
   */
  onFileSelect?: (file: File) => void;
}

/**
 * The focal point of the homepage: a large drag-and-drop target plus an
 * explicit "Choose Image" button. Purely presentational — it tracks drag
 * state for visual feedback and forwards a selected File up via
 * `onFileSelect`, but performs no validation, upload, or processing itself.
 */
export function UploadCard({ onFileSelect }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect?.(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelect?.(file);
    // Reset so selecting the same file again still fires a change event.
    event.target.value = "";
  };

  return (
    <Card
      noPadding
      role="group"
      aria-labelledby={headingId}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 text-center",
        "transition duration-200 ease-in-out sm:p-8",
        isDragging ? "border-primary bg-surface shadow-md scale-[1.01]" : "border-border hover:border-primary/50"
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

      <span
        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-primary"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 16V4M12 4 7 9M12 4l5 5" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      </span>

      <p id={headingId} className="font-heading text-base font-semibold text-text-primary sm:text-lg">
        Drag &amp; Drop Image Here
      </p>

      <span className="font-body text-sm text-text-secondary">or</span>

      <Button type="button" onClick={() => inputRef.current?.click()}>
        Choose Image
      </Button>

      <div className="mt-2 flex flex-col items-center gap-1">
        <p className="font-body text-xs text-text-secondary">{ACCEPTED_FILE_LABEL}</p>
        <p className="font-body text-xs text-text-secondary">Maximum file size: {MAX_FILE_SIZE_MB} MB</p>
      </div>
    </Card>
  );
}
