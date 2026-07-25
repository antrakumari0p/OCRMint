import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type MintLabsBadgeProps = HTMLAttributes<HTMLAnchorElement>;

/**
 * Subtle parent-brand mark. Signals "made by Mint Labs" without competing
 * with the OCRMint wordmark, which remains the primary visual identity.
 * Intentionally generic (name + link only) so every future Mint Labs
 * product can reuse it as-is.
 */
export function MintLabsBadge({ className, ...props }: MintLabsBadgeProps) {
  return (
    <a
      href="https://mintlabs.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mint Labs — parent company"
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5",
        "font-body text-xs font-medium text-text-secondary",
        "transition duration-200 ease-in-out hover:border-primary/40 hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
      Mint Labs
    </a>
  );
}
