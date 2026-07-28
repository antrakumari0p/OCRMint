import { cn } from "@/lib/cn";
import { Card } from "@/components/ui";

export interface ResultTextareaProps {
  value: string;
  /** Omit to render read-only — editing support lands in a future sprint. */
  onChange?: (value: string) => void;
  placeholder?: string;
}

/**
 * Displays the extracted text. Read-only unless a future sprint passes
 * `onChange` — `useOcr` doesn't currently expose a text setter, so this
 * component takes a plain controlled-input shape instead of assuming any
 * particular state source.
 */
export function ResultTextarea({
  value,
  onChange,
  placeholder = "Extracted text will appear here…",
}: ResultTextareaProps) {
  const isEditable = Boolean(onChange);

  return (
    <Card noPadding className="w-full">
      <textarea
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        readOnly={!isEditable}
        placeholder={placeholder}
        rows={10}
        aria-label="Extracted text"
        className={cn(
          "w-full resize-y rounded-lg border-none bg-transparent p-4 font-body text-sm text-text-primary outline-none",
          "placeholder:text-text-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      />
    </Card>
  );
}
