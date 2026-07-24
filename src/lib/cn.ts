type ClassValue = string | number | boolean | null | undefined | Record<string, boolean | null | undefined>;

/**
 * Minimal className combiner. Filters falsy values and supports a
 * `{ "class-name": condition }` shorthand — covers what this project
 * needs without pulling in clsx/tailwind-merge as dependencies.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      continue;
    }

    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
