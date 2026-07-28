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
 */
export function Home() {
  const ocr = useOcr();

  return (
    <main>
      <Hero onFileSelect={ocr.extractText} />
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
    </main>
  );
}
