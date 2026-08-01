import { cn } from "@/lib/cn";
import { BACKGROUND_THEMES } from "@/components/themes/backgrounds";
import type {
  BackgroundDensity,
  BackgroundThemeId,
} from "@/components/themes/backgrounds";

export interface DecorativeBackgroundProps {
  /** Selects which product's theme to render, e.g. "ocr", "image", "learn". */
  theme: BackgroundThemeId;
  /** Overall layer opacity. Keep within ~0.03–0.05 for a subtle, premium feel. */
  opacity?: number;
  /** How many shapes render. Higher densities are additive over lower ones. */
  density?: BackgroundDensity;
  className?: string;
}

/**
 * Purely decorative, non-interactive background layer shared by every
 * Mint Labs product. Usage: render as the first child of a `relative`
 * (ideally also `overflow-hidden`) container, and give the actual content
 * `relative z-10` so it stacks above this layer.
 *
 * - `aria-hidden` + `pointer-events-none`: invisible to assistive tech and
 *   never intercepts clicks/drags — it can never compete with real UI
 *   (e.g. the Upload Card).
 * - Hidden below `sm`; individual themes can further simplify at larger
 *   breakpoints (see `ocr.tsx`) so readability always wins on small screens.
 * - Motion respects `prefers-reduced-motion` via the global reset in
 *   `src/styles/globals.css` — no extra work needed here.
 */
export function DecorativeBackground({
  theme,
  opacity = 0.07,
  density = "low",
  className,
}: DecorativeBackgroundProps) {
  const themeDefinition = BACKGROUND_THEMES[theme];
  if (!themeDefinition) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 hidden overflow-hidden sm:block", className)}
      style={{ opacity }}
    >
      {/* Extremely slow, subtle float keyframes shared by every theme's
          shapes. Scoped here so the component ships with zero external
          CSS setup for any product that consumes it. */}
      <style>{`
        @keyframes ml-float-a { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes ml-float-b { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      `}</style>
      {themeDefinition.render({ density })}
    </div>
  );
}
