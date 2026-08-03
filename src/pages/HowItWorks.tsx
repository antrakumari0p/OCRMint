import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";
import { SEO } from "@/components/seo/SEO";
const STEPS = [
  {
    number: "01",
    title: "Upload Your Image",
    body: "Choose an image from your device or simply drag and drop it into OCRMint.",
  },
  {
    number: "02",
    title: "OCR Processing",
    body: "OCRMint detects and extracts text from your image within seconds.",
  },
  {
    number: "03",
    title: "Review the Result",
    body: "Check the extracted text and make any edits if required.",
  },
  {
    number: "04",
    title: "Copy or Download",
    body: "Copy the text to your clipboard or use it however you like.",
  },
] as const;

const FEATURES = [
  {
    title: "Private",
    body: "Whenever browser processing is available, your files stay on your device.",
  },
  {
    title: "Fast",
    body: "No unnecessary waiting. OCRMint is designed for speed.",
  },
  {
    title: "No Sign Up",
    body: "Start extracting text instantly without creating an account.",
  },
] as const;

const TIPS = [
  "Use high-resolution images.",
  "Ensure text is clearly visible.",
  "Avoid blurry photographs.",
  "Keep the document straight.",
] as const;

const SUPPORTED_FORMATS = [
  "PNG",
  "JPG",
  "JPEG",
  "WEBP",
] as const;

function StepCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 text-4xl font-bold text-primary/20 group-hover:text-primary transition-colors">
        {number}
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {body}
      </p>
    </Card>
  );
}

function FeatureCard({
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
export function HowItWorks() {
  const navigate = useNavigate();

  return (
<>
    <SEO
title="How OCR Works | OCRMint"
description="Learn how OCRMint converts images into editable text using browser-based OCR technology."
canonical="/how-it-works"
/>
    <main>

      {/* Hero */}

      <Section
        as="section"
        aria-label="How OCRMint Works"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-4 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How OCRMint Works
          </h1>

          <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
            Extract text from images in seconds using a fast, privacy-first,
            browser-based OCR experience.
          </p>
        </Container>
      </Section>

      {/* 4 Step Process */}

      <Section
        as="section"
        surface
        aria-label="OCR Process"
        className="py-12 sm:py-16"
      >
        <Container className="flex flex-col items-center gap-10">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Simple in Four Steps
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint is designed to keep the process fast, simple and
              distraction-free.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                body={step.body}
              />
            ))}
          </div>

        </Container>
      </Section>
            {/* Why Browser OCR */}

      <Section
        as="section"
        aria-label="Why OCRMint"
        className="py-12 sm:py-16"
      >
        <Container className="flex flex-col items-center gap-10">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why Browser-Based OCR?
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint is designed around speed, simplicity and privacy,
              allowing you to extract text without unnecessary complexity.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                body={feature.body}
              />
            ))}
          </div>

        </Container>
      </Section>

      {/* Tips */}

      <Section
        as="section"
        surface
        aria-label="Best OCR Tips"
        className="py-12 sm:py-16"
      >
        <Container narrow className="flex flex-col items-center gap-8">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tips for Best Results
            </h2>

            <p className="mt-3 text-text-secondary">
              Better images produce better OCR accuracy.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <Card
                key={tip}
                className="
                  flex
                  items-center
                  gap-3
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  ✓
                </div>

                <span className="text-sm text-text-primary">
                  {tip}
                </span>
              </Card>
            ))}
          </div>

        </Container>
      </Section>
            {/* Supported Formats */}

      <Section
        as="section"
        aria-label="Supported Formats"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-8 text-center"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Supported Image Formats
            </h2>

            <p className="mt-3 text-text-secondary">
              OCRMint currently supports the following image formats.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SUPPORTED_FORMATS.map((format) => (
              <span
                key={format}
                className="
                  rounded-full
                  border
                  border-border
                  bg-surface
                  px-5
                  py-2
                  text-sm
                  font-medium
                  transition-colors
                  hover:border-primary/40
                  hover:text-primary
                "
              >
                {format}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}

      <Section
        as="section"
        surface
        aria-label="Start OCR"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to extract text?
          </h2>

          <p className="max-w-xl text-text-secondary">
            Upload an image and let OCRMint convert it into editable text in
            just a few seconds.
          </p>

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