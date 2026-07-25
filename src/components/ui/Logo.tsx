import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual scale of the wordmark. Defaults to "md" (the original size). */
  size?: LogoSize;
}

const sizeStyles: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl sm:text-2xl",
};

/**
 * Placeholder wordmark for Mint Labs / OCRMint.
 * Swap for a real mark/SVG asset in `src/assets` once branding is finalized.
 * Deliberately unstyled beyond typography — no nav/header layout here.
 */
export function Logo({ size = "md", className, ...props }: LogoProps) {
  return (
    <span
      className={cn("font-heading font-bold text-text-primary", sizeStyles[size], className)}
      {...props}
    >
      OCR<span className="text-primary">Mint</span>
    </span>
  );
}
