export interface NavLink {
  label: string;
  href: string;
}

/**
 * Single source of truth for primary nav links. Shared between
 * `Navigation` (desktop) and `MobileMenu` so the two never drift apart.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Privacy", href: "#privacy" },
  { label: "About", href: "#about" },
];
