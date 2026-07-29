import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_MB } from "@/sections/UploadCard";

/**
 * Feature-detects the modern async Clipboard API's image-reading support.
 * Deliberately not UA-sniffed — some browsers (notably several mobile
 * ones) expose `navigator.clipboard` without a working `read()`, so this
 * checks for the actual method.
 */
export function isClipboardApiSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard !== "undefined" &&
    typeof navigator.clipboard.read === "function"
  );
}

export type ClipboardImageResult =
  | { kind: "image"; file: File }
  | { kind: "no-image" }
  | { kind: "permission-denied" }
  | { kind: "unsupported" }
  | { kind: "too-large" };

/**
 * Reads the system clipboard and extracts the first supported image, if
 * any. Reuses the exact same accepted formats and size limit as file
 * upload (`ACCEPTED_FILE_TYPES` / `MAX_FILE_SIZE_MB`, imported from
 * `UploadCard` rather than redefined here) so "same limit as Upload"
 * holds by construction, not by coincidence.
 *
 * Never throws for expected, handleable outcomes (unsupported browser,
 * no image found, permission denied, oversized image) — callers branch
 * on `kind`. Genuinely unexpected errors are rethrown for the caller to
 * handle generically.
 */
export async function readClipboardImage(): Promise<ClipboardImageResult> {
  if (!isClipboardApiSupported()) {
    return { kind: "unsupported" };
  }

  let items: ClipboardItems;
  try {
    items = await navigator.clipboard.read();
  } catch (cause) {
    if (cause instanceof DOMException && (cause.name === "NotAllowedError" || cause.name === "SecurityError")) {
      return { kind: "permission-denied" };
    }
    throw cause;
  }

  for (const item of items) {
    const matchedType = ACCEPTED_FILE_TYPES.find((type) => item.types.includes(type));
    if (!matchedType) continue;

    const blob = await item.getType(matchedType);
    if (blob.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return { kind: "too-large" };
    }

    const extension = matchedType.split("/")[1];
    const file = new File([blob], `clipboard-image.${extension}`, { type: matchedType });
    return { kind: "image", file };
  }

  return { kind: "no-image" };
}
