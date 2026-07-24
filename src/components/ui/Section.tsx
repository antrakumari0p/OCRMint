import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element, e.g. "header" or "footer", when needed later. */
  as?: ElementType;
  /** Applies the surface background instead of the default page background. */
  surface?: boolean;
}

/**
 * Establishes consistent vertical spacing (8px system) between page
 * sections. Contains no section-specific content — future sprints render
 * their content inside this wrapper.
 */
export function Section({ as: Tag = "section", surface = false, className, children, ...props }: SectionProps) {
  return (
    <Tag
      className={cn("w-full py-8 sm:py-10 lg:py-12", surface && "bg-surface", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
