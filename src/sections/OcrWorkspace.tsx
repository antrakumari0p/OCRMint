import type { UseOcrResult } from "@/types/ocr";
import { Container, Section } from "@/components/ui";
import { ImagePreview } from "@/components/ocr/ImagePreview";
import { ResultTextarea } from "@/components/ocr/ResultTextarea";
import { OcrActions } from "@/components/ocr/OcrActions";
import { OcrLoading } from "@/components/ocr/OcrLoading";
import { OcrError } from "@/components/ocr/OcrError";

export type OcrWorkspaceProps = Pick<
  UseOcrResult,
  "image" | "text" | "loading" | "error" | "progress" | "updateText" | "copy" | "downloadTxt" | "downloadDocx" | "clear"
>;

/**
 * Composes the post-upload OCR workflow: image preview, an editable
 * extracted-text view, and the actions that operate on it (copy /
 * download / clear).
 *
 * Takes its `useOcr()` state as props rather than calling the hook
 * itself, so the same instance can also back the homepage's upload
 * trigger (`Hero`'s `onFileSelect`) — see `Home.tsx`, which is the
 * shared parent that owns the one `useOcr()` call. There's intentionally
 * no upload/dropzone UI in this component; that stays on the homepage
 * (`Hero` / `UploadCard`), unmodified.
 */
export function OcrWorkspace({
  image,
  text,
  loading,
  error,
  progress,
  updateText,
  copy,
  downloadTxt,
  downloadDocx,
  clear,
}: OcrWorkspaceProps) {
  return (
    <Section as="section" aria-label="OCR results" className="py-8 sm:py-10">
      <Container narrow className="flex flex-col items-center gap-4">
        <ImagePreview image={image} />

        {loading && <OcrLoading progress={progress} />}

        {error && !loading && <OcrError error={error} />}

        {!loading && (
          <>
            <ResultTextarea value={text} onChange={updateText} />
            <OcrActions
              hasText={Boolean(text)}
              loading={loading}
              onCopy={copy}
              onDownloadTxt={downloadTxt}
              onDownloadDocx={downloadDocx}
              onClear={clear}
            />
          </>
        )}
      </Container>
    </Section>
  );
}
