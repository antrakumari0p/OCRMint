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
        "sticky top-0 z-50 w-full transition-all duration-200 ease-in-out",
        scrolled
          ? "border-b border-border/70 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-3 py-[6px]">
          {/* Brand block: Mint Labs badge -> OCRMint -> tagline */}
          <div className="flex flex-col gap-0">
            <MintLabsBadge />
            <Logo size="md" />
            <p className="hidden font-body text-[11px] text-text-secondary sm:block">
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
