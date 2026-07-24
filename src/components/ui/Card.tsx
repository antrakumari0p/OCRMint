import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Removes internal padding when a section needs to control its own spacing. */
  noPadding?: boolean;
}

/**
 * Generic surface for grouping content — used for feature cards, panels,
 * form containers, etc. Carries no page-specific content.
 */
export function Card({ noPadding = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background shadow-sm",
        !noPadding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
