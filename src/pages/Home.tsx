import { Hero } from "@/sections/Hero";
import { OcrWorkspace } from "@/sections/OcrWorkspace";
import { useOcr } from "@/hooks/useOcr";
import { useClipboardImage } from "@/hooks/useClipboardImage";
import { SEO } from "@/components/seo/SEO";

/**
 * Home page.
 *
 * Composes the page's sections in order. This is the one place that
 * calls `useOcr()` — its `extractText` goes into `Hero`'s existing
 * `onFileSelect` prop, and `useClipboardImage` (click + Ctrl/Cmd+V) goes
 * into the same `extractText` for images, or `reportError` for expected
 * failures (no image found, permission denied, unsupported browser,
 * oversized image). Clipboard and file upload converge on the exact same
 * `extractText` call — there's one OCR pipeline, not two.
 *
 * Before any upload, only `Hero` renders — the homepage is exactly what
 * it was. `Hero` swaps out for `OcrWorkspace` once there's either an
 * image (upload/paste succeeded) or an error (e.g. a clipboard paste
 * failed) — both are existing `useOcr` state, so a failed paste attempt
 * still gets its message shown via the same `OcrError` card `OcrWorkspace`
 * already renders for OCR failures, rather than needing a second error UI
 * anywhere inside the frozen `Hero`. Clicking "Clear" resets both `image`
 * and `error`, which naturally swaps back to `Hero`.
 *
 * The fade+slide-in keyframes are scoped to this file via an inline
 * `<style>` tag (the same self-contained pattern `DecorativeBackground`
 * already uses for its float animation), so no global CSS or Tailwind
 * config changes were needed for the transition.
 */
export function Home() {
 
  const ocr = useOcr();
  const clipboard = useClipboardImage({
    onImage: ocr.extractText,
    onError: ocr.reportError,
    disabled: ocr.loading,
  });

  const showWorkspace = Boolean(ocr.image) || Boolean(ocr.error);

  return (
     <>
  <SEO
    title="Free Image to Text OCR Online | OCRMint "
    description="Extract editable text from PNG, JPG, JPEG and WEBP images instantly. Free online OCR with privacy-first browser processing by Mint Labs."
    canonical="/"
  />
    <main>
      <style>{`
        @keyframes ocrmint-section-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {showWorkspace ? (
        <div key="workspace" className="animate-[ocrmint-section-in_400ms_ease-in-out]">
          <OcrWorkspace
            image={ocr.image}
            text={ocr.text}
            loading={ocr.loading}
            error={ocr.error}
            progress={ocr.progress}
            updateText={ocr.updateText}
            copy={ocr.copy}
            downloadTxt={ocr.downloadTxt}
            downloadDocx={ocr.downloadDocx}
            clear={ocr.clear}
          />
        </div>
      ) : (
        <div key="hero" className="animate-[ocrmint-section-in_400ms_ease-in-out]">
          <Hero
            onFileSelect={ocr.extractText}
            onPasteClick={clipboard.pasteFromClipboard}
            pasteDisabled={!clipboard.isSupported || ocr.loading}
            pasteAriaLabel={
              !clipboard.isSupported ? "Clipboard images aren't supported in this browser." : undefined
            }
          />
        </div>
      )}
    </main>
   </>
  );
}
