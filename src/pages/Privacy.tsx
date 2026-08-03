import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Section } from "@/components/ui";

const COLLECTION = [
  {
    title: "Images",
    body: "Your uploaded images are processed locally in your browser whenever possible and are not permanently stored by OCRMint.",
  },
  {
    title: "Personal Information",
    body: "OCRMint does not require you to create an account or provide personal information to use the service.",
  },
  {
    title: "Usage Data",
    body: "Basic anonymous technical information may be collected in the future to improve reliability and performance.",
  },
] as const;

const PRINCIPLES = [
  "Privacy-first design",
  "Browser-based processing whenever possible",
  "Minimal data collection",
  "No mandatory account",
] as const;

function PolicyCard({
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
export function Privacy() {
  const navigate = useNavigate();

  return (
    <main>

      {/* Hero */}

      <Section
        as="section"
        aria-label="Privacy Policy"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-4 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
            OCRMint is built around one simple principle:
            <strong> your data belongs to you.</strong> We believe OCR should
            be fast, useful and respectful of your privacy.
          </p>

          <p className="text-sm text-text-secondary">
            Last updated: August 2026
          </p>
        </Container>
      </Section>

      {/* Privacy First */}

      <Section
        as="section"
        surface
        aria-label="Privacy First"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Privacy First
            </h2>

            <p className="mt-4 max-w-2xl text-text-secondary leading-7">
              OCRMint is designed to process images directly in your browser
              whenever possible. Unlike many online OCR tools, we aim to
              minimize unnecessary data collection and avoid permanently
              storing your files.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <Card
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  ✓
                </div>

                <span className="text-sm font-medium text-text-primary">
                  {item}
                </span>
              </Card>
            ))}
          </div>

        </Container>
      </Section>
            {/* Information We Collect */}

      <Section
        as="section"
        aria-label="Information We Collect"
        className="py-12 sm:py-16"
      >
        <Container className="flex flex-col items-center gap-10">

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Information We Collect
            </h2>

            <p className="mt-3 max-w-2xl text-text-secondary">
              OCRMint is designed to collect as little information as possible.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {COLLECTION.map((item) => (
              <PolicyCard
                key={item.title}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>

        </Container>
      </Section>

      {/* How We Use Information */}

      <Section
        as="section"
        surface
        aria-label="How We Use Information"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-8"
        >

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How We Use Information
            </h2>

            <p className="mt-3 text-text-secondary">
              Any limited information we collect is used only to improve OCRMint.
            </p>
          </div>

          <Card className="w-full">
            <ul className="space-y-5 text-left text-sm leading-7 text-text-secondary">

              <li>
                • To provide OCR functionality and improve extraction accuracy.
              </li>

              <li>
                • To maintain the stability, security and performance of the website.
              </li>

              <li>
                • To understand anonymous usage patterns that help improve OCRMint.
              </li>

              <li>
                • We do <strong>not</strong> sell your personal information.
              </li>

              <li>
                • We do <strong>not</strong> permanently store uploaded images when browser processing is available.
              </li>

            </ul>
          </Card>

        </Container>
      </Section>
            {/* Cookies */}

      <Section
        as="section"
        aria-label="Cookies"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Cookies
            </h2>

            <p className="mt-3 text-text-secondary">
              OCRMint uses only the minimum technologies necessary to provide a
              smooth experience.
            </p>
          </div>

          <Card className="w-full">
            <p className="text-sm leading-7 text-text-secondary">
              OCRMint may use essential browser storage to remember preferences
              such as your selected theme (light or dark mode). Future versions
              may also use privacy-friendly analytics or advertising services.
              This Privacy Policy will always be updated before those features
              are introduced.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Third Party Services */}

      <Section
        as="section"
        surface
        aria-label="Third-party Services"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Third-party Services
            </h2>

            <p className="mt-3 text-text-secondary">
              OCRMint may rely on trusted third-party providers to operate the
              website.
            </p>
          </div>

          <Card className="w-full">
            <ul className="space-y-4 text-sm leading-7 text-text-secondary">
              <li>• Vercel — website hosting.</li>

              <li>
                • Future versions may include Google Analytics to understand
                anonymous website usage.
              </li>

              <li>
                • Future versions may display Google AdSense advertisements.
              </li>

              <li>
                • Any third-party service introduced in the future will be
                reflected in this Privacy Policy.
              </li>
            </ul>
          </Card>
        </Container>
      </Section>

      {/* Contact */}

      <Section
        as="section"
        aria-label="Privacy Contact"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions?
          </h2>

          <p className="max-w-xl text-text-secondary">
            If you have any questions about this Privacy Policy or how OCRMint
            handles your information, feel free to contact us.
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
        surface
        aria-label="Return Home"
        className="py-12 sm:py-16"
      >
        <Container
          narrow
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to use OCRMint?
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
  );
}