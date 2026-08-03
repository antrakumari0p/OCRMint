import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";
import { SEO } from "@/components/seo/SEO";

const FAQS = [
  {
    question: "Is OCRMint completely free?",
    answer:
      "Yes. OCRMint is free to use for standard image-to-text extraction. Our goal is to make OCR accessible without requiring an account for basic usage.",
  },
  {
    question: "Are my images uploaded to your servers?",
    answer:
      "Whenever browser processing is supported, OCRMint processes images locally on your device. This helps keep your documents private while reducing upload times.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "OCRMint currently supports PNG, JPG, JPEG and WEBP images. Additional formats will be added in future updates.",
  },
  {
    question: "Does OCRMint work on mobile devices?",
    answer:
      "Yes. OCRMint is fully responsive and works on modern Android, iPhone, tablet and desktop browsers.",
  },
  {
    question: "Can OCRMint recognize handwriting?",
    answer:
      "OCRMint performs best with printed text. Handwritten recognition depends on handwriting clarity and image quality.",
  },
  {
    question: "How accurate is OCRMint?",
    answer:
      "OCR accuracy depends on image resolution, lighting, text quality and font clarity. High-resolution images usually produce the best results.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. OCRMint does not require registration for standard OCR features.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "The current upload limit is 10 MB per image.",
  },
  {
    question: "Who develops OCRMint?",
    answer:
      "OCRMint is developed by Mint Labs, a collection of fast, privacy-focused browser productivity tools.",
  },
  {
    question: "How can I contact Mint Labs?",
    answer:
      "Visit our Contact page or email us using the official Mint Labs email address.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card
  className="
    group
    cursor-pointer
    border
    border-border
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-primary/30
    hover:shadow-lg
  "
  onClick={() => setOpen(!open)}
>
      <div className="flex items-center justify-between gap-6">
        <h3 className="font-heading text-lg font-semibold leading-7 text-text-primary group-hover:text-primary transition-colors">
          {question}
        </h3>

        <span
  className={`text-lg transition-all duration-300 ${
    open
      ? "rotate-180 text-primary"
      : "text-text-secondary group-hover:text-primary"
  }`}
>
  ▼
</span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "mt-4 max-h-60" : "max-h-0"
        }`}
      >
        <p className="font-body text-sm leading-7 text-text-secondary">
          {answer}
        </p>
      </div>
    </Card>
  );
}
export function FAQ(): import("react").JSX.Element {
  const navigate = useNavigate();

  return (
    <>
    <SEO
title="OCR FAQ | OCRMint"
description="Frequently asked questions about OCRMint, browser OCR, supported image formats and privacy."
canonical="/faq"
/>
    <main>
      {/* Hero */}

      <Section as="section" className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
            Everything you need to know about OCRMint, privacy, supported
            formats and browser-based OCR.
          </p>
        </Container>
      </Section>

      {/* FAQ */}

      <Section
        as="section"
        surface
        aria-label="Frequently asked questions"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col gap-4">
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Container>
      </Section>

      {/* CTA */}

      <Section as="section" className="py-12 sm:py-16">
        <Container narrow className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Still have questions?
          </h2>

          <p className="max-w-xl text-text-secondary">
            We're always improving OCRMint. If you couldn't find the answer
            you're looking for, we'd love to hear from you.
          </p>

          <Button
            type="button"
            size="lg"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </Container>
      </Section>
    </main>
   </>
  );
}