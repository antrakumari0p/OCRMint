import { cn } from "@/lib/cn";
import { NAV_LINKS } from "./navLinks";
import { ThemeToggle } from "./ThemeToggle";
import type { HTMLAttributes } from "react";

export type NavigationProps = HTMLAttributes<HTMLElement>;

const linkStyles =
  "font-body text-sm font-medium text-text-secondary transition duration-200 ease-in-out " +
  "hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 rounded-sm";

/**
 * Primary desktop navigation. Renders the nav links and the theme toggle
 * together since they always appear as a single right-aligned group.
 */
export function Navigation({ className, ...props }: NavigationProps) {
  return (
    <nav aria-label="Primary" className={cn("items-center gap-8", className)} {...props}>
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={linkStyles}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
