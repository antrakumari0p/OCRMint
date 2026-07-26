import type { SVGProps } from "react";
import { Button, Card, Container, Section } from "@/components/ui";
import { DecorativeBackground } from "@/components/background/DecorativeBackground";
import { useFileInput } from "@/hooks/useFileInput";
import { ACCEPTED_FILE_TYPES, UploadCard } from "./UploadCard";

export interface HeroProps {
  /**
   * Called with the selected file, whichever entry point the user uses
   * (the Upload Image button, drag-and-drop, or eventually Paste Image).
   * Not wired to anything yet — a future sprint can pass a handler here
   * without touching this component.
   */
  onFileSelect?: (file: File) => void;
}

function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 16V4M12 4 8 8M12 4l4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const TRUST_ITEMS = [
  {
    title: "100% Private",
    subtitle: "Your images never leave your device.",
    icon: LockIcon,
  },
  {
    title: "Lightning Fast",
    subtitle: "Extract text in seconds.",
    icon: BoltIcon,
  },
  {
    title: "Secure & Reliable",
    subtitle: "Your data is safe with us.",
    icon: ShieldCheckIcon,
  },
] as const;

/**
 * The first (and currently only) screen of OCRMint. Sized to fit within a
 * single laptop viewport (~900px tall) alongside the header, without
 * scrolling — spacing and type scale are intentionally compact rather than
 * airy. The upload experience — CTA buttons + dropzone — is the focal
 * point; heading and subheading exist to orient the user toward it
 * immediately, not to sell the product.
 */
export function Hero({ onFileSelect }: HeroProps) {
  const { inputRef, openFilePicker, handleInputChange } = useFileInput(onFileSelect);

  return (
    <Section
      as="section"
      aria-label="Extract text from an image"
      className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden py-6 sm:py-8"
    >
      <DecorativeBackground theme="ocr" density="medium" opacity={0.04} />

      <Container narrow className="relative z-10 flex flex-col items-center gap-5 text-center sm:gap-6">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl">
            <span className="block text-text-primary">Extract Text From Images</span>
            <span className="block text-primary">Instantly.</span>
          </h1>

          <p className="max-w-md font-body text-sm text-text-secondary sm:text-base">
            Upload an image, extract editable text instantly, and keep your files private.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleInputChange}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />

          <Button type="button" size="lg" onClick={openFilePicker}>
            <UploadIcon className="h-4.5 w-4.5" aria-hidden="true" />
            Upload Image
          </Button>

          <span className="font-body text-sm text-text-secondary">or</span>

          <Button type="button" variant="secondary" size="lg">
            <ClipboardIcon className="h-4.5 w-4.5" aria-hidden="true" />
            Paste Image
          </Button>
        </div>

        <UploadCard onFileSelect={onFileSelect} />

        <Card noPadding className="grid w-full grid-cols-1 gap-4 p-4 text-left sm:grid-cols-3 sm:gap-3 sm:p-5">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-body text-sm font-semibold text-text-primary">{item.title}</span>
                <span className="font-body text-xs text-text-secondary">{item.subtitle}</span>
              </span>
            </div>
          ))}
        </Card>
      </Container>
    </Section>
  );
}
