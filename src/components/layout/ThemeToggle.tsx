import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Visual theme toggle. Tracks its own local "dark" flag for the icon swap
 * only — it does not apply a theme anywhere in the app. Actual dark mode
 * (class strategy, persistence, system-preference detection) is a
 * separate, deliberate piece of work for a future sprint.
 */
export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={() => setIsDark((prev) => !prev)}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-text-secondary shadow-sm",
        "transition duration-200 ease-in-out hover:bg-surface hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4.5 w-4.5"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4.5 w-4.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
