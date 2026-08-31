# MVP — Scope & Priorities

> Companion to `docs/PRD.md`. Principle: **P0 must be solid and complete first** — the deadline is only 1–2 days.
> Status: Draft v1 — 2026-08-31.

## P0 — Required (Definition of Done)

All mandatory scope items from the brief. Check off only when verified working, not just written.

### Pages & Visuals
- [ ] Single-page public invitation, mobile + desktop responsive
- [ ] Opening/cover with "Open Invitation" button + entrance transition
- [ ] Event information section (ceremony & reception)
- [ ] Gallery section using the asset pack
- [ ] Couple profile section using the asset pack
- [ ] Maps/location section (embed + Google Maps CTA)
- [ ] Transition animations between sections, respecting `prefers-reduced-motion`

### Interactive Features
- [ ] Background music from the asset pack + mute/play toggle
- [ ] Real-time countdown to the event day (finished state if passed)

### RSVP
- [ ] RSVP Form: guest name, attendance status (Attending/Not attending), party size
- [ ] Client + server validation; field-level error messages
- [ ] Data persistently stored in the database (verified in Supabase)

### Wishes
- [ ] Wishes Form: name + message; client + server validation
- [ ] Visitors can submit new wishes
- [ ] Visitors can view submitted wishes (loaded from DB, persistent on refresh)

### Backend
- [ ] API route handlers: POST RSVP, POST wish, GET wishes
- [ ] Supabase Database + RLS (public insert; public read for wishes; private read for RSVP)
- [ ] Basic error handling for submission flows (validation failure, network failure)

### SEO & Metadata (WhatsApp Preview Focus)
- [ ] Metadata Title & Description in Root Layout
- [ ] Open Graph Image (OG Image) connected to Cover Photo (`cover-portrait.png`)
- [ ] JSON-LD Event Schema (Configured via `src/lib/seo/schemas.ts`)

### Assets Mapping (Based on PRD Guidelines)
- [ ] `cover-portrait.png`: Front page photo (Mandatory for OG Image / WhatsApp SEO)
- [ ] `welcoming-portrait.png`: Welcoming section photo
- [ ] `bride.png` & `groom.png`: Bride & Groom profiles (Landscape)
- [ ] `counting-days-landscape.png`: Countdown background (Apply CSS grayscale/B&W filter)
- [ ] `footer-portrait.png`: Footer section photo
- [ ] `desktop-landscape.png`: Background for large screens (Laptop/PC)
- [ ] `gallery-1.png` - `gallery-3.png`: Photos for the Gallery section
- [ ] `welcoming-background.jpg`: Texture pattern for the Welcoming section (Square 1:1)

### Documentation & Delivery
- [ ] Comprehensive README: local setup, architecture/technical decisions, env + DB setup, AI disclosure
- [ ] `.env.example` + SQL database setup documented
- [ ] GitHub Repo ready to submit (clean, no secrets, no junk files)
- [ ] Live deployment URL accessible by reviewers

## P1 — Nice-to-have (Only if P0 is 100% complete with remaining time)

Execution order based on priority:

1. Guest name personalization via URL (`?to=Name`) displayed on the cover
2. Clean empty states & skeleton loading for the wishes list
3. "Save the date" link (Google Calendar)
4. Additional micro-interactions (hover/press states, button animations)
5. `loading.tsx` / smooth fallback for images

## Out of Scope (Explicitly do not build)

- Admin dashboard, authentication, guest list management (Brief §1.6)
- Pixel-perfect copy of the Ricky + Felly template
- Edit/delete functionality for user wishes
- Multi-language, separate dark mode, features outside the P0/P1 list
- Adding large dependencies (heavy UI kits, state management libraries) unless strictly necessary
