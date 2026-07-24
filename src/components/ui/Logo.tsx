import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type LogoProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Placeholder wordmark for Mint Labs / OCRMint.
 * Swap for a real mark/SVG asset in `src/assets` once branding is finalized.
 * Deliberately unstyled beyond typography — no nav/header layout here.
 */
export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      className={cn("font-heading text-lg font-bold text-text-primary", className)}
      {...props}
    >
      OCR<span className="text-primary">Mint</span>
    </span>
  );
}
