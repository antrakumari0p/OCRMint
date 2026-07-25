# Changelog

All notable changes to this project are documented in this file.

## Sprint 2 — Navigation System

- Sticky site header (`Header`) with scroll-based transparent → solid transition
- Mint Labs badge (`MintLabsBadge`) as a subtle, clickable parent-brand mark
- OCRMint branding + tagline in the header, built on the existing `Logo` primitive
- Desktop navigation (`Navigation`): How It Works, Privacy, About + theme toggle
- Mobile navigation (`MobileMenu`): hamburger trigger with slide-down panel
- Theme toggle UI (`ThemeToggle`) — visual only, no dark mode logic yet
- Shared `NAV_LINKS` data source to keep desktop and mobile nav in sync
- `useScrolled` hook for sticky header scroll detection
- Extended `Logo` with a `size` variant to support larger nav branding without duplicating the component

## Sprint 1 — Project Foundation

- Project foundation
- Folder structure
- Design tokens
- UI primitives
- Fonts
- Tailwind configuration
