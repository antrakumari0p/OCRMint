import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";
import { SEO } from "@/components/seo/SEO";

const PRINCIPLES = [
  "Fair use",
  "Respect for privacy",
  "No illegal activity",
  "Continuous improvement",
] as const;

function TermsCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {body}
      </p>
    </Card>
  );
}

export function Terms() {
  const navigate = useNavigate();

  return (
     <>
    <SEO
title="Terms of Service | OCRMint"
description="Read the Terms of Service governing your use of OCRMint."
canonical="/terms"
/>
    <main>

      {/* Hero */}

      <Section
        as="section"
        aria-label="Terms of Service"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-4 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Terms of Service
          </h1>

          <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
            These Terms govern your use of OCRMint. By using this website,
            you agree to these Terms of Service.
          </p>

          <p className="text-sm text-text-secondary">
            Last updated: August 2026
          </p>

        </Container>
      </Section>

      {/* Principles */}

      <Section
        as="section"
        surface
        aria-label="Principles"
        className="py-12 sm:py-16"
      >
        <Container
          className="flex flex-col items-center gap-10"
        >

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our Principles
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint exists to provide useful OCR tools while protecting users
              and maintaining a fair service for everyone.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">

            {PRINCIPLES.map((item) => (
              <Card
                key={item}
                className="flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  ✓
                </div>

                <span className="font-medium text-text-primary">
                  {item}
                </span>

              </Card>
            ))}

          </div>

        </Container>
      </Section>
            {/* Acceptance of Terms */}

      <Section
        as="section"
        aria-label="Acceptance of Terms"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Acceptance of These Terms
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              By accessing or using OCRMint, you agree to comply with these
              Terms of Service and all applicable laws and regulations.
              If you do not agree with these Terms, please discontinue using
              the website.
            </p>
          </div>

        </Container>
      </Section>

      {/* Using OCRMint */}

      <Section
        as="section"
        surface
        aria-label="Using OCRMint"
        className="py-12 sm:py-16"
      >
        <Container className="flex flex-col items-center gap-10">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Using OCRMint
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint is intended to help users extract text from images for
              personal, educational and professional purposes.
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2">

            <TermsCard
              title="Permitted Use"
              body="You may use OCRMint to process images that you own or are legally authorised to use."
            />

            <TermsCard
              title="Availability"
              body="We aim to keep OCRMint available and reliable, but uninterrupted service cannot be guaranteed."
            />

          </div>

        </Container>
      </Section>

      {/* User Responsibilities */}

      <Section
        as="section"
        aria-label="User Responsibilities"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              User Responsibilities
            </h2>

            <p className="mt-3 text-text-secondary">
              By using OCRMint, you agree that you will not:
            </p>
          </div>

          <Card className="w-full">
            <ul className="space-y-5 text-left text-sm leading-7 text-text-secondary">

              <li>
                • Upload content that violates any applicable law.
              </li>

              <li>
                • Use OCRMint to infringe another person's copyright,
                trademark or intellectual property.
              </li>

              <li>
                • Attempt to disrupt, overload or interfere with the service.
              </li>

              <li>
                • Use automated systems in a manner that negatively affects
                OCRMint or other users.
              </li>

            </ul>
          </Card>

        </Container>
      </Section>
            {/* Intellectual Property */}

      <Section
        as="section"
        surface
        aria-label="Intellectual Property"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Intellectual Property
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint, its branding, design, content and software are the
              property of Mint Labs unless otherwise stated.
            </p>
          </div>

          <Card className="w-full">
            <p className="text-sm leading-7 text-text-secondary">
              You may use OCRMint for its intended purpose, but you may not
              copy, reproduce, redistribute, reverse engineer or commercially
              exploit any part of the website without prior written permission,
              except where permitted by applicable law.
            </p>
          </Card>

        </Container>
      </Section>

      {/* Disclaimer */}

      <Section
        as="section"
        aria-label="Disclaimer"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Disclaimer
            </h2>

            <p className="mt-3 text-text-secondary">
              OCRMint is provided on an "as is" and "as available" basis.
            </p>
          </div>

          <Card className="w-full">
            <p className="text-sm leading-7 text-text-secondary">
              While we work hard to provide accurate OCR results, we cannot
              guarantee that extracted text will always be completely accurate,
              uninterrupted or error-free. Users should verify important
              information before relying on OCR output.
            </p>
          </Card>

        </Container>
      </Section>

      {/* Limitation of Liability */}

      <Section
        as="section"
        surface
        aria-label="Limitation of Liability"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Limitation of Liability
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              To the fullest extent permitted by law, Mint Labs shall not be
              liable for any direct, indirect, incidental or consequential
              damages arising from the use of OCRMint.
            </p>
          </div>

        </Container>
      </Section>

      {/* Changes */}

      <Section
        as="section"
        aria-label="Changes to Terms"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Changes to These Terms
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              We may update these Terms of Service from time to time. Any
              changes will be published on this page together with an updated
              revision date.
            </p>
          </div>

        </Container>
      </Section>

      {/* Contact */}

      <Section
        as="section"
        surface
        aria-label="Terms Contact"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-6 text-center">

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions About These Terms?
          </h2>

          <p className="max-w-xl text-text-secondary">
            If you have any questions regarding these Terms of Service,
            please contact us.
          </p>

          <a
            href="mailto:hello.mintlabs@gmail.com"
            className="text-lg font-semibold text-primary hover:underline"
          >
            hello.mintlabs@gmail.com
          </a>

        </Container>
      </Section>

      {/* CTA */}

      <Section
        as="section"
        aria-label="Return Home"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-6 text-center">

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to extract text?
          </h2>

          <Button
            size="lg"
            onClick={() => navigate("/")}
          >
            Start Using OCRMint
          </Button>

        </Container>
      </Section>

    </main>
  </>
  );
}