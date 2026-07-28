import type { OcrError as OcrErrorType } from "@/types/ocr";

export interface OcrErrorProps {
  error: OcrErrorType;
}

/**
 * Error state display. Deliberately uses only existing neutral tokens
 * (no new red/danger color) — this project doesn't have a semantic error
 * color defined yet, and adding one is outside this sprint's scope.
 */
export function OcrError({ error }: OcrErrorProps) {
  return (
    <div role="alert" className="flex w-full flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5 text-text-secondary"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
      <p className="font-body text-sm font-medium text-text-primary">Something went wrong</p>
      <p className="font-body text-sm text-text-secondary">{error.message}</p>
    </div>
  );
}
