import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";

const WHY_OCRMINT = [
  {
    title: "Fast",
    body: "Extract text in seconds using optimized browser-based OCR.",
  },
  {
    title: "Private",
    body: "Whenever possible, your images remain on your own device instead of being uploaded elsewhere.",
  },
  {
    title: "Free",
    body: "Powerful OCR should be available to everyone without unnecessary barriers.",
  },
] as const;

/**
 * The About page. Built entirely from existing primitives (`Section`,
 * `Container`, `Card`, `Button`) — no new UI components, no new design
 * tokens, no changes to Header/Navigation/Theme. Section backgrounds
 * alternate via `Section`'s existing `surface` prop for visual rhythm,
 * matching how the homepage already uses it.
 */
export function About() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Section 1 — Hero */}
      <Section as="section" aria-label="About OCRMint" className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            About OCRMint
          </h1>
          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            OCRMint is a privacy-first browser OCR application developed by Mint Labs. Our goal is simple: help
            people extract editable text from images quickly, accurately and without sacrificing privacy. Whenever
            browser processing is possible, your files remain on your own device.
          </p>
        </Container>
      </Section>

      {/* Section 2 — Our Mission */}
      <Section as="section" aria-label="Our mission" surface className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Mission</h2>
          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            Modern OCR tools are often slow, cluttered, or require users to upload sensitive documents to remote
            servers. OCRMint was built to offer a faster, cleaner and privacy-focused alternative. We believe
            extracting text from images should be effortless.
          </p>
        </Container>
      </Section>

      {/* Section 3 — Why OCRMint */}
      <Section as="section" aria-label="Why OCRMint" className="py-12 sm:py-16">
        <Container className="flex flex-col items-center gap-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why OCRMint</h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {WHY_OCRMINT.map((item) => (
              <Card key={item.title} className="flex flex-col gap-2 text-left">
                <h3 className="font-heading text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="font-body text-sm text-text-secondary">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4 — Built by Mint Labs */}
      <Section as="section" aria-label="Built by Mint Labs" surface className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Built by Mint Labs</h2>
          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            OCRMint is one product within the Mint Labs ecosystem. Mint Labs develops practical browser-based tools
            that help people work faster while respecting user privacy. More products are planned in the future
            across images, documents, learning and productivity.
          </p>
        </Container>
      </Section>

      {/* Section 5 — CTA */}
      <Section as="section" aria-label="Get started" className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to extract text?</h2>
          <Button type="button" size="lg" onClick={() => navigate("/")}>
            Try OCRMint Free
          </Button>
        </Container>
      </Section>
    </main>
  );
}
