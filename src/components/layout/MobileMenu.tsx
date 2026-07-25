import { useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "./navLinks";
import { ThemeToggle } from "./ThemeToggle";

export type MobileMenuProps = HTMLAttributes<HTMLDivElement>;

const MENU_ID = "mobile-nav-menu";

/**
 * Hamburger trigger + slide-down panel for small screens. Shares
 * `NAV_LINKS` with `Navigation` so desktop and mobile never fall out of
 * sync, and keeps its own open/closed state local to this component.
 */
export function MobileMenu({ className, ...props }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)} {...props}>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-text-primary",
          "transition duration-200 ease-in-out hover:bg-surface",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {isOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id={MENU_ID}
        className={cn(
          "absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-md border border-border bg-background shadow-sm",
          "transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col p-2">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-sm px-3 py-2 font-body text-sm font-medium text-text-secondary",
                    "transition duration-200 ease-in-out hover:bg-surface hover:text-text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex items-center justify-between border-t border-border px-3 pt-2">
            <span className="font-body text-sm text-text-secondary">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
