import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Caps line length for text-heavy content (e.g. prose blocks). */
  narrow?: boolean;
}

/**
 * Centers content and applies consistent responsive horizontal gutters.
 * Wrap page sections in this rather than repeating max-width classes.
 */
export function Container({ narrow = false, className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-3 sm:px-4 lg:px-6",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
