import { Container, Logo } from "@/components/ui";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { MintLabsBadge } from "./MintLabsBadge";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

/**
 * Site-wide sticky header. Transparent at the top of the page; gains a
 * solid background, thin border, and light shadow once the page scrolls
 * past ~24px (see `useScrolled`). Reused by every route, not just Home.
 */
export function Header() {
  const scrolled = useScrolled(24);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-border bg-background shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Brand block: Mint Labs badge -> OCRMint -> tagline */}
          <div className="flex flex-col gap-0.5">
            <MintLabsBadge />
            <Logo size="lg" />
            <p className="hidden font-body text-xs text-text-secondary sm:block">
              Extract Text From Images Instantly.
            </p>
          </div>

          <Navigation className="hidden md:flex" />
          <MobileMenu className="md:hidden" />
        </div>
      </Container>
    </header>
  );
}
