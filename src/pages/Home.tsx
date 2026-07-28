import { Hero } from "@/sections/Hero";
import { OcrWorkspace } from "@/sections/OcrWorkspace";
import { useOcr } from "@/hooks/useOcr";

/**
 * Home page.
 *
 * Composes the page's sections in order. This is the one place that
 * calls `useOcr()` — its `extractText` goes into `Hero`'s existing
 * `onFileSelect` prop (already there, previously unused), and the rest
 * of the hook's state/actions go into `OcrWorkspace`. Neither `Hero` nor
 * `UploadCard` needed any changes: `Hero` already forwarded
 * `onFileSelect` to its own "Upload Image" button and to `UploadCard`,
 * so wiring happens entirely at this composition layer.
 *
 * Before any upload, only `Hero` renders — the homepage is exactly what
 * it was. Once `useOcr` has an image (set the moment `extractText` is
 * called, before recognition even finishes), `Hero` is swapped out for
 * `OcrWorkspace`. This is a plain conditional render driven by existing
 * hook state — no new state, no routing, no reload. Clicking "Clear" in
 * `OcrWorkspace` resets `image` to null, which naturally swaps back to
 * `Hero` with no extra wiring.
 *
 * The fade+slide-in keyframes are scoped to this file via an inline
 * `<style>` tag (the same self-contained pattern `DecorativeBackground`
 * already uses for its float animation), so no global CSS or Tailwind
 * config changes were needed for the transition.
 */
export function Home() {
  const ocr = useOcr();
  const hasUploaded = Boolean(ocr.image);

  return (
    <main>
      <style>{`
        @keyframes ocrmint-section-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {hasUploaded ? (
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
          <Hero onFileSelect={ocr.extractText} />
        </div>
      )}
    </main>
  );
}
