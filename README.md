# OCRMint

OCRMint is the first product built by **Mint Labs**. This repository contains the frontend application.

> This README documents the engineering foundation. Product-facing sections (marketing site, OCR upload flow, authentication, etc.) will be documented here as they're built.

---

## 1. Project Overview

This repository is the frontend codebase for OCRMint — a React + TypeScript single-page application built on Vite and styled with Tailwind CSS.

At this stage, the project consists of a **production-grade engineering foundation**: folder structure, design tokens, reusable UI primitives, typography, and tooling. It does not yet contain product features (no navigation, hero, upload flow, OCR logic, authentication, or backend). Those are intentionally deferred to future sprints so the foundation can be reviewed and locked in first.

## 2. What is OCRMint?

OCRMint is Mint Labs' OCR (Optical Character Recognition) SaaS product. It will allow users to upload documents/images and extract structured, editable text from them. Product functionality is out of scope for this stage of the codebase — this repo currently covers the frontend engineering scaffold only.

## 3. Tech Stack

| Layer            | Choice                                   |
| ----------------- | ----------------------------------------- |
| Framework          | React 18                                  |
| Language           | TypeScript                                |
| Build tool         | Vite                                      |
| Styling            | Tailwind CSS                              |
| Fonts              | Manrope (headings), Inter (body)          |
| Linting            | ESLint (flat config) + typescript-eslint  |
| Package manager    | npm                                        |

No UI kits (Bootstrap, Material UI, Chakra UI) are used — all UI primitives are hand-built and live in `src/components/ui`.

## 4. Installation

**Requirements:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

## 5. Folder Structure

```
src/
  assets/            Static assets (images, icons, brand files)
  components/
    ui/              Generic, content-agnostic UI primitives
                      (Button, Card, Container, Section, Logo)
    layout/          Structural layout components (header/footer shells, etc.)
  sections/          Page-specific content sections (Hero, UploadArea, ...)
  hooks/             Reusable React hooks
  lib/               Shared utilities and non-visual logic (tokens, cn, etc.)
  styles/            Global stylesheet (Tailwind layers, resets, typography)
  types/             Shared, cross-cutting TypeScript types
  pages/             Route-level page components composed from sections
  App.tsx            Root component — renders page structure only
  main.tsx           Application entry point
```

**Why this structure:**

- `ui/` holds "dumb" primitives with no product content — reused everywhere.
- `layout/` holds structural shells (headers, footers, page frames) built from `ui/` primitives.
- `sections/` holds actual page content (Hero, UploadArea, etc.), composed from `ui/` and `layout/`.
- `pages/` assembles sections into full routes; `App.tsx` stays minimal and only renders page structure, so it never becomes a dumping ground as the app grows.
- Design tokens are defined once and mirrored in two places: `tailwind.config.ts` (for className-based styling) and `src/lib/tokens.ts` (for raw values needed outside of Tailwind classes, e.g. inline styles or canvas/chart rendering).

## 6. Development Workflow

1. **Branching:** create a feature branch off `main` for each unit of work (e.g. `feature/upload-area`, `fix/button-focus-state`).
2. **Before committing:** run `npm run lint` and `npm run build` locally to make sure the change type-checks, lints cleanly, and builds.
3. **Components:** add generic, reusable UI to `components/ui`; add product-specific content to `sections/`. Avoid putting page content directly in `App.tsx` or `pages/*`.
4. **Styling:** use Tailwind utility classes and the design tokens defined in `tailwind.config.ts` / `src/lib/tokens.ts` rather than introducing new ad-hoc colors or spacing values.
5. **Changelog:** log every notable change in `CHANGELOG.md` under a new entry.
6. **Review:** significant structural or architectural changes go through review (see Sprint History below for prior review outcomes) before merging.

## 7. Sprint History

### Sprint 1 — Project Foundation
Established the engineering foundation for OCRMint:
- Scalable folder structure (`components/ui`, `components/layout`, `sections`, `hooks`, `lib`, `styles`, `types`, `pages`)
- Design tokens (brand colors, 8px spacing system) in Tailwind config and `lib/tokens.ts`
- Core UI primitives: `Button`, `Card`, `Container`, `Section`, `Logo`
- Font loading: Manrope (headings) and Inter (body)
- Tailwind CSS configuration and global styles (reset, typography, smooth scroll, base transitions)
- Minimal `App.tsx` rendering an empty `Home` page shell — no product content yet

**CTO review outcome:** Approved with revisions. Follow-up items (README, changelog, `.gitignore` hardening, ESLint configuration) were addressed as part of the revision pass — see `CHANGELOG.md`.

Future sprints will add: navigation, hero section, upload area, OCR functionality, authentication, and backend integration.
