# PRD — Wedding Invitation Website (Invitato Hometask)

> Derived from the Invitato candidate brief (Lark: `EAUdA7I9oI4Qpxc5bil6B33gzb`).
> Status: Draft v1 — 2026-08-31. Changes to requirements are logged in [Assumptions & Decisions](#9-assumptions--decisions).

## 1. Objective

Build a public wedding invitation website drawing visual inspiration from the **Ricky + Felly** template (invitato.net/template-rickyfelly) as an end-to-end product slice: high-quality frontend, modern-futuristic UI/UX, and real backend integration (persistent storage for RSVP + wishes).

Deadline: **Maximum 1–2 days** from brief receipt (received 2026-08-31). Priority: core feature completion > implementation quality > clear documentation.

## 2. Persona & Core Flow

**Persona**: Wedding guest. Arrives via a shared link, mostly viewing on **mobile**. Not logged in, no account required.

**Core flow (Happy Path)**:

1. Guest opens link → **cover/opening** is displayed (couple's names, "Open Invitation" button).
2. Guest opens invitation → background music starts, main content fades in with a transition animation.
3. Guest explores sections: hero + countdown, couple profiles, event information, gallery.
4. Guest fills out the **RSVP form** (name, attendance status, party size) → submits → data saved to DB → success feedback.
5. Guest fills out the **wishes form** (name, message) → submits → wish immediately appears in the list.
6. Guest can read wishes submitted by others.

## 3. Pages & Sections

A single public page (scrollable) with the section order following the Ricky + Felly reference. Final order to be confirmed during implementation by observing the reference template:

| # | Section | Content | Notes |
|---|---------|---------|-------|
| 1 | Cover / Opening | Couple photo/names, date, "Open Invitation" button | Full-screen overlay; entrance transition when clicked |
| 2 | Hero + Countdown | Couple names, event date, countdown to event day | Real-time countdown (ticking seconds) |
| 3 | Couple | Bride & Groom profiles + photos | From asset pack |
| 4 | Event Info | Ceremony & Reception: day/date, time, venue | Two event cards |
| 5 | Gallery | Photo grid/carousel | Asset pack, modern-futuristic mood |
| 6 | RSVP | Attendance confirmation form | See §4.1 |
| 7 | Wishes | Submit wish form + wishes list | See §4.2 |
| 8 | Maps / Location | Venue map + "Open in Google Maps" button | Google Maps embed |
| 9 | Closing / Footer | Closing remark, credits | — |

Global Elements:

- **Background Music** — autostarts after opening (respecting browser autoplay policies via the "Open Invitation" gesture); persistent play/mute toggle on scroll.
- **Transition Animations** — fade/slide between sections upon entering viewport, cover → content transition, matching reference mood.
- **Responsive** — mobile-first; desktop remains constrained and elegant (centered max-width container, typical for digital invitations).
- **SEO & Metadata** — Comprehensive Open Graph for WhatsApp Link Previews (Title, Description, Thumbnail/Cover Photo), JSON-LD (Event Schema).

## 4. Functional Requirements

### 4.1 RSVP / Guest Confirmation Form

| Field | Description | Validation |
|-------|-------------|------------|
| Guest Name | Name of the person RSVPing | Required, 1–100 characters after trim |
| Attendance Status | Radio/select: **Attending** / **Not attending** | Required |
| Party Size | Number of people attending | Integer 1–10; relevant if "Attending" |

Behavior:

- Submit calls API → data saved to DB → show inline success message.
- Failure (validation/server) → show error message on form; user input is retained.
- The RSVP list is **not publicly displayed** (no requirement to show it; only stored).

### 4.2 Wishes Form

| Field | Description | Validation |
|-------|-------------|------------|
| Name | Sender's name | Required, 1–100 characters after trim |
| Message | The wish/message | Required, 1–500 characters after trim |

Behavior:

- Submit → new wish saved and **immediately appears in the list** (prepended or appended + scrolled).
- Wishes list is loaded from DB when section is opened; displays name, message, and relative time.
- Submit failure → inline error message, input retained.

### 4.3 Music, Countdown, Maps, Animations

- **Music**: Audio file from asset pack; looping; toggle visible throughout the page.
- **Countdown**: Counts down to the event date (configured via constant/env); "Event day arrived" state if passed.
- **Maps**: Google Maps iframe embed + "Open in Google Maps" CTA.
- **Animations**: Inter-section transitions + micro-interactions; must respect `prefers-reduced-motion`.

## 5. Data Model

Postgres (Supabase). Two simple, unassociated tables:

```sql
create table rsvps (
  id         bigint generated always as identity primary key,
  name       text not null,
  attendance text not null check (attendance in ('attending', 'not_attending')),
  party_size integer not null default 1 check (party_size between 1 and 10),
  created_at timestamptz not null default now()
);

create table wishes (
  id         bigint generated always as identity primary key,
  name       text not null,
  message    text not null,
  created_at timestamptz not null default now()
);
```

Access (RLS, no auth): `anon` role can INSERT to both `rsvps` and `wishes`. `anon` can SELECT only `wishes` (wishes are public; RSVPs are private).

## 6. Validation & Error Handling

- Validation must occur **on the server** (route handlers) as the source of truth; client-side validation is solely for fast UX.
- API Responses must be consistent: success `200/201 { data }`, failure `400 { errors: { field, message } }` or `500 { error }`.
- Forms must display field-specific errors; submit button disabled while requesting (prevent double-submit).
- Timeout/Network failure → polite generic error message, allow retry.

## 7. Non-Functional

- **Responsive**: mobile-first; sensible desktop breakpoint.
- **Performance**: optimize asset pack images (`next/image`, reasonable sizing); fast LCP for the cover.
- **Basic Accessibility**: form labels, sufficient contrast, keyboard navigation, `prefers-reduced-motion`.
- **Data Integrity**: No fake seeded wishes/RSVPs; empty lists should render as appropriate empty states.
- **Security**: Server-only env variables, no secrets in the client bundle; inputs escaped by React (no `dangerouslySetInnerHTML`).
- **SEO**: Use Next.js Metadata API and a dedicated file (`src/lib/seo/schemas.ts`) to inject JSON-LD `<script>` into the RootLayout.

## 8. Acceptance Criteria

- [ ] Invitation page opens flawlessly on mobile and desktop without layout breakage.
- [ ] Cover → "Open Invitation" → main content revealed with transition; music starts + toggle available.
- [ ] Countdown ticks in real-time toward the configured date.
- [ ] Couple, event info, gallery, and maps sections are all present and use the asset pack.
- [ ] RSVP: Valid submissions saved to DB (verified in Supabase table); invalid inputs rejected with clear messaging.
- [ ] Wishes: Valid submissions saved and immediately visible in the list; list loads existing wishes; messages >500 chars rejected.
- [ ] Page refresh: Wishes remain visible (persistent).
- [ ] `pnpm build` and `pnpm type-check` pass with zero errors.
- [ ] Live URL accessible to reviewers; README complete per §1.9 of the brief.

## 9. Assumptions & Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript | Scaffolded in repo; React+TS is a "plus" in the brief |
| Styling | Tailwind CSS v4 | Scaffolded in repo |
| Backend | Next.js Route Handlers (Monolith) | Short deadline; sufficient for 2 endpoints |
| Database | Supabase Postgres (Free Tier) | Real persistence, free, easy Vercel deployment |
| Deployment | Vercel (TBD) | Natural fit for Next.js; finalize during implementation |
| Doc Language | All internal docs and README in English | Universal readability, token efficiency for AI agents |

Assumptions to confirm during implementation:

- Final section order and composition follow the Ricky + Felly template.
- Asset pack contents (photos, music, sample couple names) align with the provided Google Drive pack.
