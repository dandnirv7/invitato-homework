<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Invitato Homework — Wedding Invitation Website

Public wedding invitation site inspired by the Invitato "Ricky + Felly" template
(https://invitato.net/template-rickyfelly/). Assessment-only project; see PRD for full
requirements.

## Read first

- `docs/PRD.md` — requirements, data model, acceptance criteria.
- `docs/MVP.md` — scope priorities. P0 must be complete before anything else.

## Commands

```bash
pnpm install        # install dependencies (pnpm only, packageManager pinned)
pnpm dev            # dev server
pnpm build          # production build
pnpm type-check     # tsc --noEmit
pnpm lint           # eslint
pnpm lint:fix       # eslint --fix
pnpm format         # prettier write
pnpm format:check   # prettier check
```

Run `pnpm type-check` and `pnpm lint` before considering any task done.

## Stack (pinned)

- Next.js 16.3.3 (App Router) + React 19.2.8 + TypeScript 5
- Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config; use CSS variables in
  `src/app/globals.css` for design tokens)
- Backend: Next.js route handlers (`src/app/api/...`), no separate server
- Database: Supabase Postgres; access server-side only (env vars never prefixed
  `NEXT_PUBLIC_`)

## Structure

```
src/app/            # App Router routes, global styles, layouts
src/features/       # Feature module (landing)
src/components/     # Global components (ui, layout, shared)
src/lib/            # Global utilities, db clients (supabase), seo
public/assets/      # Invitato asset pack (photos, music) — assessment-only
docs/               # PRD.md, MVP.md
```

## Conventions

- **Naming Convention:** MUST use strict `kebab-case` for all files and directories (e.g., `form-wishes.tsx`, `use-submit-rsvp.ts`).
- **Feature-Based Architecture:** Domain logic is organized inside `src/features/landing/`.
  - Houses its own `components/`, `api/` (data fetching/actions), `hooks/`, `lib/`, and `types.ts`.
- **Global Components:** Generic UI components (buttons, inputs) and layouts belong in `src/components/ui/` or `src/components/layout/`.
- **Server First:** Server Components by default; add `"use client"` only when a component truly needs it (interactivity, hooks).
- **Validation:** Validation lives on the server; client-side checks are UX only.
- **Styling:** Tailwind utilities only; colors/spacing via CSS variables in `globals.css`, no ad-hoc hex values.
- **TypeScript:** Strict typing; avoid `any`.
- **Images:** Use `next/image`; optimize asset-pack files before use.

## Hard rules

- Never remove the `nextjs-agent-rules` block above — `next dev` regenerates it anyway.
- Consult `node_modules/next/dist/docs/` before using any Next.js API you are unsure about; this version has breaking changes vs. older Next.js.
- The asset pack is Invitato's copyrighted material, provided solely for this assessment. Never use it outside this repo, never substitute it with fabricated/fake imagery.
- Never commit secrets; `.env*` are gitignored, `.env.example` documents the variables.
- Never seed fake wishes or RSVPs; empty lists render as honest empty states.
