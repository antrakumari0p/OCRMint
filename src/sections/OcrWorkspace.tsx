import { Container, Section } from "@/components/ui";
import { ImagePreview } from "@/components/ocr/ImagePreview";
import { ResultTextarea } from "@/components/ocr/ResultTextarea";
import { OcrActions } from "@/components/ocr/OcrActions";
import { OcrLoading } from "@/components/ocr/OcrLoading";
import { OcrError } from "@/components/ocr/OcrError";
import { useOcr } from "@/hooks/useOcr";

/**
 * Composes the post-upload OCR workflow: image preview, extracted-text
 * view, and the actions that operate on it (copy / download / clear).
 *
 * This is a self-contained results view, not yet wired into the homepage
 * — it owns its own `useOcr()` instance rather than receiving one as
 * props. There's intentionally no upload/dropzone UI here; that stays on
 * the frozen homepage (`Hero` / `UploadCard`). See the sprint report's
 * Future Integration Notes for how a later sprint connects the two.
 */
export function OcrWorkspace() {
  const { image, text, loading, error, progress, copy, downloadTxt, downloadDocx, clear } = useOcr();

  return (
    <Section as="section" aria-label="OCR results" className="py-8 sm:py-10">
      <Container narrow className="flex flex-col items-center gap-4">
        <ImagePreview image={image} />

        {loading && <OcrLoading progress={progress} />}

        {error && !loading && <OcrError error={error} />}

        {!loading && (
          <>
            <ResultTextarea value={text} />
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
