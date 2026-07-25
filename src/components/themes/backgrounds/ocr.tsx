/* eslint-disable react-refresh/only-export-components -- this is a theme
   data module (exports a `BackgroundTheme` object), not a component
   boundary, so the fast-refresh export-shape rule doesn't apply here. */
import type { BackgroundTheme, BackgroundThemeRenderProps } from "./types";
import { DENSITY_ORDER } from "./types";

/**
 * All icons are geometric outline line-art (stroke-only, no fill, no
 * emoji) — document, scan lines, sparkle, image frame, text lines. Kept
 * as small internal components so `renderOcrShapes` stays readable.
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

function TextLinesIcon() {
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
      <path d="M8 16h48M8 28h48M8 40h32M8 52h40" />
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
 * Placement is intentionally toward the edges/corners, away from the
 * centered Upload Card, and each shape carries its own extremely slow
 * float animation (defined once in DecorativeBackground) for a premium,
 * non-distracting feel.
 */
const SHAPES: ShapeConfig[] = [
  {
    id: "document",
    minDensity: DENSITY_ORDER.low,
    className:
      "absolute left-[4%] top-[14%] h-24 w-24 -rotate-6 text-text-primary md:h-32 md:w-32 " +
      "animate-[ml-float-a_22s_ease-in-out_infinite]",
    icon: DocumentIcon,
  },
  {
    id: "scanner",
    minDensity: DENSITY_ORDER.low,
    className:
      "absolute right-[6%] bottom-[12%] h-24 w-24 rotate-3 text-text-primary md:h-32 md:w-32 " +
      "animate-[ml-float-b_26s_ease-in-out_infinite]",
    icon: ScannerIcon,
  },
  {
    id: "sparkle",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute right-[14%] top-[10%] h-12 w-12 text-primary md:h-16 md:w-16 " +
      "animate-[ml-float-a_18s_ease-in-out_infinite] hidden md:block",
    icon: SparkleIcon,
  },
  {
    id: "image-frame",
    minDensity: DENSITY_ORDER.medium,
    className:
      "absolute left-[9%] bottom-[16%] h-20 w-20 rotate-6 text-text-primary md:h-24 md:w-24 " +
      "animate-[ml-float-b_24s_ease-in-out_infinite] hidden md:block",
    icon: ImageFrameIcon,
  },
  {
    id: "text-lines",
    minDensity: DENSITY_ORDER.high,
    className:
      "absolute left-[44%] top-[6%] h-9 w-24 text-text-primary " +
      "animate-[ml-float-a_20s_ease-in-out_infinite] hidden lg:block",
    icon: TextLinesIcon,
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
