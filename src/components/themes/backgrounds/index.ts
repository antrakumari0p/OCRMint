import { ocrTheme } from "./ocr";
import { imageTheme } from "./image";
import { learnTheme } from "./learn";
import { mediaTheme } from "./media";
import { calcTheme } from "./calc";
import type { BackgroundTheme } from "./types";

/**
 * Central registry of every Mint Labs product's background theme.
 * `<DecorativeBackground theme="..." />` looks up its shapes here.
 *
 * To add a new product's background: create `themes/backgrounds/<id>.tsx`
 * exporting a `BackgroundTheme`, then add one entry below. No other file
 * needs to change.
 */
export const BACKGROUND_THEMES = {
  ocr: ocrTheme,
  image: imageTheme,
  learn: learnTheme,
  media: mediaTheme,
  calc: calcTheme,
} as const satisfies Record<string, BackgroundTheme>;

export type BackgroundThemeId = keyof typeof BACKGROUND_THEMES;

export type { BackgroundDensity, BackgroundTheme } from "./types";
