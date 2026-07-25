import type { ReactNode } from "react";

/**
 * Higher densities are additive over lower ones — "medium" includes
 * everything "low" renders, plus more; "high" includes "medium", plus more.
 */
export type BackgroundDensity = "low" | "medium" | "high";

export const DENSITY_ORDER: Record<BackgroundDensity, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export interface BackgroundThemeRenderProps {
  density: BackgroundDensity;
}

export interface BackgroundTheme {
  /** Registry key — matches the `theme` prop on <DecorativeBackground />. */
  id: string;
  /** Human-readable product name, useful for future theme pickers / dev tooling. */
  label: string;
  /**
   * Renders the theme's decorative shapes as absolutely-positioned nodes.
   * Returns `null` for themes that don't have artwork yet — this keeps
   * placeholder products registered and usable without breaking anything.
   */
  render: (props: BackgroundThemeRenderProps) => ReactNode;
}
