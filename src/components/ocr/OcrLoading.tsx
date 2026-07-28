import type { OcrProgress } from "@/types/ocr";

export interface OcrLoadingProps {
  progress: OcrProgress;
}

/**
 * Progress indicator shown while `useOcr().loading` is true. The fill
 * width is the one legitimate use of an inline style here — it's a
 * runtime-computed percentage, which static Tailwind classes can't
 * express; the color itself still comes from the `bg-primary` token.
 */
export function OcrLoading({ progress }: OcrLoadingProps) {
  return (
    <div role="status" aria-live="polite" className="flex w-full flex-col items-center gap-2 py-6 text-center">
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
      <p className="font-body text-sm text-text-secondary">{progress.message ?? "Processing…"}</p>
    </div>
  );
}
