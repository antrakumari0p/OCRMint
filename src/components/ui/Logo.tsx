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
 * Wordmark for Mint Labs / OCRMint, with a small decorative leaf accent
 * near the end of "Mint" (the brand's mint-leaf motif). The leaf is purely
 * decorative (`aria-hidden`) and absolutely positioned so it never affects
 * text layout or line height.
 */
export function Logo({ size = "md", className, ...props }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block font-heading font-bold text-text-primary",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      OCR<span className="text-primary">Mint</span>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        aria-hidden="true"
        className="absolute -top-1.5 right-1.5 h-3 w-3 rotate-12 text-primary sm:h-3.5 sm:w-3.5"
      >
        <path d="M12 21c-4-1-7-5-7-10 4 0 7 3 7 7 0-4 3-7 7-7 0 5-3 9-7 10Z" />
      </svg>
    </span>
  );
}
