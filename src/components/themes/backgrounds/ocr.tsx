/* eslint-disable react-refresh/only-export-components -- this is a theme
   data module (exports a `BackgroundTheme` object), not a component
   boundary, so the fast-refresh export-shape rule doesn't apply here. */
import type { BackgroundTheme, BackgroundThemeRenderProps } from "./types";
import { DENSITY_ORDER } from "./types";

/**
 * All icons are geometric outline line-art or simple monoline glyphs
 * (stroke-only where possible, no fill unless the shape needs it, no
 * emoji) — document, text glyph, image frame, OCR scan-frame, crop tool,
 * scanner, sparkle, plus-accent, dot-grid, and quote mark. Kept as small
 * internal components so `renderOcrShapes` stays readable.
 */

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M18 6h20l10 10v42a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M38 6v10h10" />
      <path d="M22 30h20M22 38h20M22 46h14" />
    </svg>
  );
}

function ScannerIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <rect x="10" y="14" width="44" height="36" rx="3" />
      <path d="M10 30h44" />
      <path d="M20 40h10" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M32 8v14M32 42v14M8 32h14M42 32h14M16 16l10 10M38 38l10 10M48 16 38 26M26 38 16 48" />
    </svg>
  );
}

function ImageFrameIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <rect x="8" y="12" width="48" height="40" rx="3" />
      <circle cx="22" cy="26" r="4" />
      <path d="m14 46 12-12 10 8 8-10 12 14" />
    </svg>
  );
}

/** Literal "Aa" glyph — the theme's "text" icon. */
function TextGlyphIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <text
        x="2"
        y="46"
        fontSize="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fill="currentColor"
      >
        Aa
      </text>
    </svg>
  );
}

/** Four corner brackets forming a viewfinder-style "OCR frame". */
function ScanFrameIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M8 20V12a4 4 0 0 1 4-4h8" />
      <path d="M8 44v8a4 4 0 0 0 4 4h8" />
      <path d="M56 20V12a4 4 0 0 0-4-4h-8" />
      <path d="M56 44v8a4 4 0 0 1-4 4h-8" />
    </svg>
  );
}

/** Crop-tool icon: two overlapping right-angle brackets. */
function CropIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M18 4v36a4 4 0 0 0 4 4h36" />
      <path d="M46 60V24a4 4 0 0 0-4-4H6" />
    </svg>
  );
}

/** Small plus-sign accent. */
function PlusIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      className="h-full w-full"
    >
      <path d="M32 14v36M14 32h36" />
    </svg>
  );
}

/** Small 3x3 dot-grid accent. */
function DotGridIcon() {
  const positions = [12, 32, 52];
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" stroke="none" className="h-full w-full" aria-hidden="true">
      {positions.flatMap((cy) =>
        positions.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.5} />)
      )}
    </svg>
  );
}

/** Stylized quotation mark accent. */
function QuoteIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" stroke="none" className="h-full w-full" aria-hidden="true">
      <path d="M8 20c0-8 6-14 14-14v6c-4 0-7 3-7 8h7v16H8V20Z" />
      <path d="M34 20c0-8 6-14 14-14v6c-4 0-7 3-7 8h7v16H34V20Z" />
    </svg>
  );
}

interface ShapeConfig {
  id: string;
  /** Minimum density level (see DENSITY_ORDER) required to render this shape. */
  minDensity: number;
  className: string;
  icon: () => JSX.Element;
}

/**
 * Placement is intentionally scattered toward the edges/corners — flanking
 * the heading up top and framing the sides further down — while staying
 * clear of the centered content column (heading/CTAs/dropzone/trust bar),
 * which is narrower than the section itself. Each shape carries its own
 * extremely slow float animation (defined once in DecorativeBackground)
 * for a premium, non-distracting feel.
 */
const SHAPES: ShapeConfig[] = [
  {
    id: "document",
    minDensity: DENSITY_ORDER.low,
    className:
      "absolute left-[3%] top-[16%] h-20 w-20 -rotate-6 text-text-primary md:h-28 md:w-28 " +
      "animate-[ml-float-a_22s_ease-in-out_infinite]",
    icon: DocumentIcon,
  },
  {
    id: "image-frame",
    minDensity: DENSITY_ORDER.low,
    className:
      "absolute right-[4%] top-[20%] h-20 w-20 rotate-3 text-text-primary md:h-28 md:w-28 " +
      "animate-[ml-float-b_26s_ease-in-out_infinite]",
    icon: ImageFrameIcon,
  },
  {
    id: "text-glyph",
    minDensity: DENSITY_ORDER.low,
    className:
      "absolute left-[10%] top-[2%] h-14 w-14 text-text-primary md:h-20 md:w-20 hidden sm:block " +
      "animate-[ml-float-a_20s_ease-in-out_infinite]",
    icon: TextGlyphIcon,
  },
  {
    id: "sparkle-1",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute right-[16%] top-[6%] h-10 w-10 text-primary md:h-12 md:w-12 hidden md:block " +
      "animate-[ml-float-a_18s_ease-in-out_infinite]",
    icon: SparkleIcon,
  },
  {
    id: "sparkle-2",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute left-[6%] bottom-[22%] h-8 w-8 text-primary md:h-10 md:w-10 hidden md:block " +
      "animate-[ml-float-b_16s_ease-in-out_infinite]",
    icon: SparkleIcon,
  },
  {
    id: "scanner",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute right-[5%] bottom-[14%] h-20 w-20 rotate-3 text-text-primary md:h-24 md:w-24 hidden md:block " +
      "animate-[ml-float-b_24s_ease-in-out_infinite]",
    icon: ScannerIcon,
  },
  {
    id: "scan-frame",
    minDensity: DENSITY_ORDER.high,
    className:
      "absolute right-[10%] top-[36%] h-16 w-16 text-primary hidden lg:block " +
      "animate-[ml-float-a_20s_ease-in-out_infinite]",
    icon: ScanFrameIcon,
  },
  {
    id: "crop",
    minDensity: DENSITY_ORDER.high,
    className:
      "absolute left-[14%] bottom-[8%] h-12 w-12 text-text-primary hidden lg:block " +
      "animate-[ml-float-b_22s_ease-in-out_infinite]",
    icon: CropIcon,
  },
  {
    id: "plus-1",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute left-[2%] top-[42%] h-6 w-6 text-text-secondary hidden md:block " +
      "animate-[ml-float-a_14s_ease-in-out_infinite]",
    icon: PlusIcon,
  },
  {
    id: "plus-2",
    minDensity: DENSITY_ORDER.high,
    className:
      "absolute right-[8%] bottom-[30%] h-6 w-6 text-text-secondary hidden lg:block " +
      "animate-[ml-float-b_15s_ease-in-out_infinite]",
    icon: PlusIcon,
  },
  {
    id: "dot-grid",
    minDensity: DENSITY_ORDER.high,
    className: "absolute right-[3%] top-[52%] h-10 w-10 text-text-secondary hidden lg:block",
    icon: DotGridIcon,
  },
  {
    id: "quote",
    minDensity: DENSITY_ORDER.high,
    className: "absolute left-[3%] bottom-[36%] h-10 w-10 text-text-secondary hidden lg:block",
    icon: QuoteIcon,
  },
];

function renderOcrShapes({ density }: BackgroundThemeRenderProps) {
  const level = DENSITY_ORDER[density];

  return SHAPES.filter((shape) => level >= shape.minDensity).map((shape) => {
    const Icon = shape.icon;
    return (
      <div key={shape.id} className={shape.className}>
        <Icon />
      </div>
    );
  });
}

export const ocrTheme: BackgroundTheme = {
  id: "ocr",
  label: "OCRMint",
  render: renderOcrShapes,
};