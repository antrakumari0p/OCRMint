import { Container, Section } from "@/components/ui";
import { DecorativeBackground } from "@/components/background/DecorativeBackground";
import { UploadCard } from "./UploadCard";

const TRUST_INDICATORS = ["Free", "Private", "No Signup", "Fast OCR"] as const;

/**
 * The first (and currently only) screen of OCRMint. The upload card is the
 * focal point — heading and subheading exist to orient the user toward it
 * immediately, not to sell the product. No footer, no additional sections.
 */
export function Hero() {
  return (
    <Section
      as="section"
      aria-label="Extract text from an image"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-10 sm:py-12"
    >
      <DecorativeBackground theme="ocr" />

      <Container narrow className="relative z-10 flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Extract Text From Images Instantly
          </h1>

          <div className="flex flex-col items-center gap-1">
            <p className="max-w-lg font-body text-base text-text-secondary sm:text-lg">
              Convert JPG, PNG, WEBP and more into editable text in seconds.
            </p>
            <p className="font-body text-sm font-medium text-text-secondary sm:text-base">
              Fast. Private. Free.
            </p>
          </div>
        </div>

        <UploadCard />

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_INDICATORS.map((label) => (
            <li
              key={label}
              className="flex items-center gap-1.5 font-body text-sm text-text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
