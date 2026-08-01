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
export const ACCEPTED_FILE_LABEL = "Supports PNG • JPG • JPEG • WEBP";
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
      "group relative mx-auto flex w-full max-w-[900px] flex-col items-center justify-center overflow-hidden rounded-[28px]",
      "border px-10 py-8 transition-all duration-300 backdrop-blur-md",

      // Light mode
      "border-slate-200 bg-white/80 shadow-[0_20px_70px_rgba(0,0,0,0.06)]",

      // Dark mode
      "dark:border-zinc-700 dark:bg-[#121a18] dark:shadow-[0_20px_70px_rgba(0,0,0,0.55)]",

      isDragging
        ? "scale-[1.01] border-primary shadow-[0_25px_80px_rgba(16,185,129,0.18)]"
        : "hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/40 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
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

    {/* Upload Icon */}

    <div
      className="
      flex h-24 w-24 items-center justify-center rounded-3xl
      bg-gradient-to-br
      from-primary/20
      via-primary/10
      to-transparent
      ring-1 ring-primary/20
      dark:from-primary/30
      dark:via-primary/15
      dark:ring-primary/30
    "
    >
      <CloudUploadIcon className="h-10 w-10 text-primary" />
    </div>

    {/* Heading */}

    <h2
      id={headingId}
      className="mt-6 font-heading text-3xl font-bold tracking-tight text-text-primary dark:text-white"
    >
      Drop your image here
    </h2>

    {/* Subtitle */}

    <p className="mt-3 max-w-lg text-center text-base leading-7 text-text-secondary dark:text-zinc-400">
      Upload an image or drag it here to instantly extract editable text.
    </p>

    {/* File Types */}

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {["PNG", "JPG", "JPEG", "WEBP"].map((type) => (
        <span
          key={type}
          className="
          rounded-full
          border
          border-slate-200
          bg-slate-50
          px-5
          py-2
          text-xs
          font-semibold
          tracking-wide
          text-slate-500

          dark:border-zinc-700
          dark:bg-zinc-800
          dark:text-zinc-300
        "
        >
          {type}
        </span>
      ))}
    </div>

    {/* Max Size */}

    <p className="mt-7 text-sm text-slate-500 dark:text-zinc-500">
      Maximum file size: {MAX_FILE_SIZE_MB} MB
    </p>

    {/* Privacy Badge */}

    <div
      className="
      mt-5
      rounded-full
      border
      border-primary/20
      bg-primary/5
      px-6
      py-2
      text-sm
      font-medium
      text-primary

      dark:border-primary/25
      dark:bg-primary/10
    "
    >
      🔒 Processed locally • Never stored
    </div>
  </button>
  );
}