import { Button } from "@/components/ui";

export interface OcrActionsProps {
  hasText: boolean;
  loading: boolean;
  onCopy: () => void;
  onDownloadTxt: () => void;
  onDownloadDocx: () => void;
  onClear: () => void;
}

/**
 * The actions available once there's (or was) an image/result to act on.
 * Purely reuses the existing `Button` primitive — no new button styling.
 */
export function OcrActions({
  hasText,
  loading,
  onCopy,
  onDownloadTxt,
  onDownloadDocx,
  onClear,
}: OcrActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button type="button" variant="secondary" onClick={onCopy} disabled={!hasText || loading}>
        Copy Text
      </Button>
      <Button type="button" variant="secondary" onClick={onDownloadTxt} disabled={!hasText || loading}>
        Download .txt
      </Button>
      <Button type="button" variant="secondary" onClick={onDownloadDocx} disabled={!hasText || loading}>
        Download .docx
      </Button>
      <Button type="button" variant="ghost" onClick={onClear} disabled={loading}>
        Clear
      </Button>
    </div>
  );
}
