import type { BackgroundTheme } from "./types";

/**
 * Placeholder theme for MediaMint. No artwork yet — registering it now
 * means `<DecorativeBackground theme="media" />` already works (renders
 * nothing) and adding real shapes later is a one-file change.
 */
export const mediaTheme: BackgroundTheme = {
  id: "media",
  label: "MediaMint",
  render: () => null,
};
