import type { SVGProps } from "react";
import { Button, Container, Section } from "@/components/ui";
import { DecorativeBackground } from "@/components/background/DecorativeBackground";
import { useFileInput } from "@/hooks/useFileInput";
import { ACCEPTED_FILE_TYPES, UploadCard } from "./UploadCard";

export interface HeroProps {
  onFileSelect?: (file: File) => void;
  onPasteClick?: () => void;
  pasteDisabled?: boolean;
  pasteAriaLabel?: string;
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
  { label: "Private", icon: LockIcon },
  { label: "Fast OCR", icon: BoltIcon },
  { label: "Free", icon: ShieldCheckIcon },
  { label: "Browser Based", icon: UploadIcon },
] as const;

export function Hero({
  onFileSelect,
  onPasteClick,
  pasteDisabled,
  pasteAriaLabel,
}: HeroProps) {
  const { inputRef, openFilePicker, handleInputChange } =
    useFileInput(onFileSelect);

  return (
    <Section
      as="section"
      aria-label="Extract text from an image"
      className="relative flex min-h-[85vh] items-center overflow-hidden py-5"
    >
      <DecorativeBackground
        theme="ocr"
        density="medium"
        opacity={0.07}
      />

      <Container className="relative z-10 max-w-6xl">

        <div className="flex flex-col items-center text-center">

          <h1 className="max-w-4xl 3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Extract Text From Images
            <br />

            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Instantly.
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-base leading-7 text-text-secondary">
            Convert screenshots, scanned documents and photos into editable text
            directly in your browser. Fast, private and completely free.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleInputChange}
            className="sr-only"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            <Button
              size="md"
              onClick={openFilePicker}
            >
              <UploadIcon className="h-4 w-4" />
              Upload Image
            </Button>

            <Button
              size="md"
              variant="secondary"
              onClick={onPasteClick}
              disabled={pasteDisabled}
              aria-label={
                pasteAriaLabel ?? "Paste image from clipboard"
              }
            >
              <ClipboardIcon className="h-4 w-4" />
              Paste Image
            </Button>

          </div>

          <div className="mt-10 w-full">
            <UploadCard onFileSelect={onFileSelect} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">

            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium text-text-secondary"
              >
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
            ))}

          </div>

        </div>

      </Container>
    </Section>
  );
}