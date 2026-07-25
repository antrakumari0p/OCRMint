import type { BackgroundTheme } from "./types";

/**
 * Placeholder theme for CalcMint. No artwork yet — registering it now
 * means `<DecorativeBackground theme="calc" />` already works (renders
 * nothing) and adding real shapes later is a one-file change.
 */
export const calcTheme: BackgroundTheme = {
  id: "calc",
  label: "CalcMint",
  render: () => null,
};
