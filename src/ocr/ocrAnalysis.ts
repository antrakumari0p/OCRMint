import { createWorker } from "tesseract.js";
import { destroyCanvas, drawImageToCanvas, loadImage, rotateImage } from "@/services/imageCanvas";
import type { ImageAnalysis } from "@/services/imageAnalysis";
import type { TextLayoutType } from "./ocrConfig";

/**
 * Classifies text layout from an already-computed `ImageAnalysis` — no
 * image re-scan happens here. `detectedTextLineCount` and
 * `textCoverageRatio` come from the same row-projection scan
 * `imageAnalysis.ts` already runs for preprocessing purposes; this
 * function only interprets those numbers, satisfying "avoid running
 * expensive analysis twice."
 */
export function classifyTextLayout(analysis: ImageAnalysis): TextLayoutType {
  const { estimatedTextLineHeight, detectedTextLineCount, textCoverageRatio, height } = analysis;

  if (detectedTextLineCount === 0) {
    return "document"; // no clear text bands found — fall back to the safest general-purpose mode
  }

  const lineHeightRatio = height > 0 ? estimatedTextLineHeight / height : 0;
  if (detectedTextLineCount === 1 && lineHeightRatio > 0.25) {
    return "single-line"; // one band, filling a large fraction of the image height
  }

  if (textCoverageRatio < 0.12 && detectedTextLineCount <= 6) {
    return "sparse"; // scattered, low-coverage bands — labels/UI text rather than continuous prose
  }

  if (detectedTextLineCount <= 12 && textCoverageRatio < 0.5) {
    return "paragraph"; // a handful of lines in a moderate, continuous region
  }

  return "document"; // many lines and/or high coverage — treat as a full page
}

export interface OrientationResult {
  /** Degrees the image needs to be rotated (clockwise) to become upright. */
  correctionDegrees: 90 | 180 | 270;
  confidence: number;
}

/** Below this, Tesseract's own OSD confidence is treated as unreliable — skip rotation rather than guess. */
const MIN_ORIENTATION_CONFIDENCE = 5;

/** Downsampling the OSD check keeps it fast; gross orientation doesn't need full resolution. */
const ORIENTATION_CHECK_MAX_DIMENSION = 700;

function normalizeTo90(degrees: number): 0 | 90 | 180 | 270 {
  return ((((Math.round(degrees / 90) * 90) % 360) + 360) % 360) as 0 | 90 | 180 | 270;
}

/**
 * Detects whether an image is rotated 90/180/270 degrees from upright,
 * using Tesseract's own orientation-and-script detection (OSD) rather
 * than a hand-rolled pixel heuristic — reliably telling 0° from 90° from
 * 180° apart from pixel statistics alone is a genuinely hard problem
 * without script-level understanding, which is exactly what OSD exists
 * for.
 *
 * Deliberately defensive: this loads a separate 'osd' worker (orientation
 * detection needs different trained data than recognition), and any
 * failure — worker init, the detect call itself, or a missing/low-
 * confidence result — is treated as "orientation unknown" and returns
 * `null` rather than risking an incorrect rotation. This never blocks or
 * delays the actual OCR call on failure; worst case, an already-rotated
 * image just doesn't get corrected this time.
 *
 * Note: the correction is `360 - orientation_degrees`, not
 * `orientation_degrees` itself — Tesseract reports how far the text
 * currently *is* from upright, not how far to rotate it back.
 */
export async function detectOrientation(source: Blob): Promise<OrientationResult | null> {
  let worker: Awaited<ReturnType<typeof createWorker>> | undefined;

  try {
    const image = await loadImage(source);
    const longerSide = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = longerSide > ORIENTATION_CHECK_MAX_DIMENSION ? ORIENTATION_CHECK_MAX_DIMENSION / longerSide : 1;
    const checkWidth = Math.round(image.naturalWidth * scale);
    const checkHeight = Math.round(image.naturalHeight * scale);

    const { canvas } = drawImageToCanvas(image, checkWidth, checkHeight);

    let checkBlob: Blob;
    try {
      checkBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Failed to export canvas"))));
      });
    } finally {
      destroyCanvas(canvas);
    }

    worker = await createWorker("osd");
    const { data } = await worker.detect(checkBlob);

    if (data.orientation_degrees === null || data.orientation_confidence === null) {
      return null;
    }
    if (data.orientation_confidence < MIN_ORIENTATION_CONFIDENCE) {
      return null;
    }

    const reportedDegrees = normalizeTo90(data.orientation_degrees);
    if (reportedDegrees === 0) {
      return null; // already upright
    }

    const correctionDegrees = ((360 - reportedDegrees) % 360) as 90 | 180 | 270;
    return { correctionDegrees, confidence: data.orientation_confidence };
  } catch {
    return null;
  } finally {
    await worker?.terminate();
  }
}

/** Applies a detected correction to an image, returning the rotated Blob. */
export async function correctOrientation(source: Blob, correctionDegrees: 90 | 180 | 270): Promise<Blob> {
  const image = await loadImage(source);
  return rotateImage(image, correctionDegrees);
}
