/**
 * OCRMint design tokens.
 *
 * Source of truth for brand colors and the 8px spacing system.
 * These values are mirrored as Tailwind utilities in `tailwind.config.ts`.
 * Prefer Tailwind classes (e.g. `bg-primary`) in components; reach for
 * these raw values only when you need them outside of className strings
 * (inline styles, canvas/SVG drawing, chart libraries, etc).
 */

export const colors = {
  primary: "#10B981",
  primaryHover: "#059669",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
} as const;

/** 8px baseline spacing scale. */
export const spacing = {
  1: "8px",
  2: "16px",
  3: "24px",
  4: "32px",
  5: "40px",
  6: "48px",
  7: "56px",
  8: "64px",
  9: "72px",
  10: "80px",
  12: "96px",
  16: "128px",
} as const;

export const fonts = {
  heading: "'Manrope', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export const radii = {
  sm: "6px",
  md: "10px",
  lg: "16px",
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
