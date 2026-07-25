import { Hero } from "@/sections/Hero.tsx";

/**
 * Home page.
 *
 * Composes the page's sections in order. Currently just the Hero (which
 * is the whole first-screen upload experience) — no footer or additional
 * sections yet.
 */
export function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
