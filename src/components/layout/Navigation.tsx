import { cn } from "@/lib/cn";
import { HomeIcon, NAV_LINKS } from "./navLinks";
import { ThemeToggle } from "./ThemeToggle";
import type { HTMLAttributes } from "react";

export type NavigationProps = HTMLAttributes<HTMLElement>;

const linkStyles =
  "inline-flex items-center gap-1.5 font-body text-sm font-medium text-text-secondary transition duration-200 ease-in-out " +
  "hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 rounded-sm";

/**
 * Primary desktop navigation. Home renders as a distinct pill (icon +
 * label, tinted green) indicating the current page; the remaining links
 * are plain icon + text. The theme toggle rides along in the same group
 * since it's always right-aligned with the links.
 */
export function Navigation({ className, ...props }: NavigationProps) {
  return (
    <nav aria-label="Primary" className={cn("items-center gap-6", className)} {...props}>
      <ul className="flex items-center gap-6">
        <li>
          <a
            href="#"
            aria-current="page"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-body text-sm font-medium text-primary transition duration-200 ease-in-out hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            Home
          </a>
        </li>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={linkStyles}>
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
