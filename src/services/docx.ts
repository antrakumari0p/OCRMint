import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * Builds a .docx file (as a Blob) from plain text, one Word paragraph
 * per line. Mirrors `services/ocr.ts`'s role for Tesseract — this is the
 * one place that talks to the `docx` library, keeping `useOcr` free of
 * document-formatting details.
 */
export async function createDocxBlob(text: string): Promise<Blob> {
  const lines = text.split("\n");
  const paragraphs = lines.map((line) => new Paragraph({ children: [new TextRun(line)] }));

  const doc = new Document({
    sections: [
      {
        children: paragraphs.length > 0 ? paragraphs : [new Paragraph({})],
      },
    ],
  });

  return Packer.toBlob(doc);
}
