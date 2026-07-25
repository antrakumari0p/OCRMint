import type { BackgroundTheme } from "./types";

/**
 * Placeholder theme for LearnMint. No artwork yet — registering it now
 * means `<DecorativeBackground theme="learn" />` already works (renders
 * nothing) and adding real shapes later is a one-file change.
 */
export const learnTheme: BackgroundTheme = {
  id: "learn",
  label: "LearnMint",
  render: () => null,
};
