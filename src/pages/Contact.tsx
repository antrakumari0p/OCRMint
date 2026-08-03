import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";
import { SEO } from "@/components/seo/SEO";

const CONTACT_OPTIONS = [
  {
    title: "General Enquiries",
    body: "Questions about OCRMint, feedback, or anything related to the product.",
  },
  {
    title: "Bug Reports",
    body: "Found an issue? Let us know so we can investigate and improve OCRMint.",
  },
  {
    title: "Feature Requests",
    body: "Have an idea for a new feature? We'd love to hear your suggestions.",
  },
] as const;

export function Contact() {
  const navigate = useNavigate();

  return (
     <>
    <SEO
title="Contact OCRMint | Mint Labs"
description="Contact OCRMint for feedback, bug reports, feature requests or business enquiries."
canonical="/contact"
/>
    <main>
      {/* Hero */}
      <Section as="section" aria-label="Contact OCRMint" className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Need Help With OCRMint
          </h1>

          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            We'd love to hear from you. Whether you have a question,
            discovered a bug, or have an idea that could improve OCRMint,
            feel free to get in touch.
          </p>
        </Container>
      </Section>

      {/* Ways to Contact */}
      <Section
        as="section"
        aria-label="Ways to contact"
        surface
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Get in Touch
          </h2>

          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            The easiest way to reach us is by email. We aim to respond to
            all genuine enquiries within 48 hours.
          </p>

          <Card className="w-full max-w-xl text-center">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Email
            </h3>

            <a
  href="mailto:hello.mintlabs@gmail.com"
  className="mt-2 block text-base font-medium text-primary hover:underline break-all"
>
  hello.mintlabs@gmail.com
</a>

            <p className="mt-4 font-body text-sm text-text-secondary">
              Response time: Usually within 48 hours.
              We read every genuine email personally.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Contact Reasons */}
      <Section
        as="section"
        aria-label="Contact reasons"
        className="py-12 sm:py-16"
      >
        <Container className="flex flex-col items-center gap-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What can we help you with?
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {CONTACT_OPTIONS.map((item) => (
              <Card key={item.title} className="flex flex-col gap-2 text-left">
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-text-secondary">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Business */}
      <Section
        as="section"
        aria-label="Business enquiries"
        surface
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Business Enquiries
          </h2>

          <p className="max-w-2xl font-body text-base text-text-secondary sm:text-lg">
            OCRMint is a product developed by Mint Labs. For partnerships,
            collaborations, media enquiries or other business-related
            discussions, please contact us using the same email address
            above and please include <strong>"Business Enquiry"</strong> in the subject
            line.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        as="section"
        aria-label="Start using OCRMint"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to extract text?
          </h2>

          <Button
            type="button"
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