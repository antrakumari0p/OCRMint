import type { Config } from "tailwindcss";

/**
 * OCRMint design tokens live here AND in src/lib/tokens.ts.
 * - This file exposes them as Tailwind utilities (bg-primary, text-secondary, etc.)
 * - tokens.ts exposes the same raw values for use in JS/TS (e.g. inline styles, charts).
 * Keep both in sync when a token changes.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10B981",
          hover: "#059669",
        },
        background: "#FFFFFF",
        surface: "#F8FAFC",
        border: "#E5E7EB",
        text: {
          primary: "#111827",
          secondary: "#6B7280",
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
