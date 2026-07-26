import type { Config } from "tailwindcss";

/**
 * OCRMint design tokens live here AND in src/lib/tokens.ts.
 * - This file exposes them as Tailwind utilities (bg-primary, text-secondary, etc.)
 * - tokens.ts exposes the same raw values for use in JS/TS (e.g. inline styles, charts).
 * Keep both in sync when a token changes.
 *
 * Colors are wired to CSS custom properties (defined in src/styles/globals.css
 * under `:root` and `.dark`) rather than static hex values. That's what lets
 * `darkMode: "class"` below flip every `bg-background`, `text-text-primary`,
 * etc. across the whole app the moment `.dark` is toggled on <html> — no
 * component needs its own `dark:` variant classes.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      // 8px baseline spacing system, additive to Tailwind's default scale.
      spacing: {
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "7": "56px",
        "8": "64px",
        "9": "72px",
        "10": "80px",
        "12": "96px",
        "16": "128px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
