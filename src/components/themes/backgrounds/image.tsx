import type { BackgroundTheme } from "./types";

/**
 * Placeholder theme for ImageMint. No artwork yet — registering it now
 * means `<DecorativeBackground theme="image" />` already works (renders
 * nothing) and adding real shapes later is a one-file change.
 */
export const imageTheme: BackgroundTheme = {
  id: "image",
  label: "ImageMint",
  render: () => null,
};
