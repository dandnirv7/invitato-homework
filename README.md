# Wedding Invitation — Invitato Hometask

A public wedding invitation website inspired by the Invitato
[Ricky + Felly template](https://invitato.net/template-rickyfelly/), built as an
end-to-end product slice: polished frontend, RSVP & wishes backed by a real API and
persistent database.

> **Status: in development.** Sections marked _TBD_ are finalized once the build is
> complete. Requirements live in [`docs/PRD.md`](docs/PRD.md); scope priorities in
> [`docs/MVP.md`](docs/MVP.md).

## Features

- Full-screen opening cover with "Open Invitation" transition
- Background music with persistent play/mute toggle
- Real-time countdown to the wedding day
- Couple profiles, event details (ceremony & reception), and photo gallery
- RSVP form (guest name, attendance status, party size) — persisted to database
- Wishes: submit a message and see all wishes from other guests — persisted to database
- Venue section with embedded map + Google Maps link
- Fully responsive (mobile-first) with section transition animations

## Tech Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Frontend   | Next.js 16 (App Router) + React 19          |
| Language   | TypeScript (strict)                         |
| Styling    | Tailwind CSS v4                             |
| Backend    | Next.js route handlers (`src/app/api`)      |
| Database   | Supabase (Postgres) with Row Level Security |
| Deployment | Vercel — _TBD_                              |

## Getting Started

Prerequisites: Node.js 20+ and [pnpm](https://pnpm.io) 10.

```bash
pnpm install
cp .env.example .env.local   # then fill in the Supabase values
pnpm dev                     # http://localhost:3000
```

Other commands:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm type-check   # TypeScript check
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Environment Variables

Copy `.env.example` to `.env.local`. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; others are strictly **server-only**.

| Variable                               | Description                                                 |
| -------------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Your Supabase project URL                                   |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Project anon/publishable key (Settings → API)               |
| `NEXT_PUBLIC_SITE_URL`                 | Base URL for SEO/Open Graph (e.g., `http://localhost:3000`) |

## Database Setup

Run this once in the Supabase SQL editor (or `psql`):

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

alter table rsvps enable row level security;
alter table wishes enable row level security;

create policy "public can insert rsvps" on rsvps
  for insert to anon with check (true);
create policy "public can insert wishes" on wishes
  for insert to anon with check (true);
create policy "public can read wishes" on wishes
  for select to anon using (true);
```

RSVP rows are insert-only (never displayed publicly); wishes are public read + insert.

## Architecture & Technical Decisions

- **Single Next.js app for frontend + API.** The backend surface is two small features (RSVP, wishes), so route handlers keep everything in one deployable unit without the overhead of a separate service.
- **Supabase Postgres.** A real, persistent database with a generous free tier; RLS policies enforce that anonymous visitors can only do exactly what the product allows.
- **Server-side validation as the source of truth.** Client validation exists purely for fast UX; every request is re-validated in the route handler.
- **Feature Module Organization.** Feature logic is consolidated inside `src/features/landing` encapsulating all invitation sections, forms (RSVP, wishes), hooks, and types.

## Project Structure

```text
src/app/            # routes, layouts, API route handlers
src/features/       # feature logic (landing: cover, couple, rsvp, wishes, etc.)
src/components/     # global UI components (shadcn/ui) & layouts
src/lib/            # global utilities, supabase client, seo
public/assets/      # Invitato asset pack (assessment-only)
docs/               # PRD.md, MVP.md, DESIGN.md
```

## AI Tools Disclosure

In accordance with the assessment guidelines, AI coding tools/agents were utilized during the development of this project to accelerate implementation.

**Tools Used:**

- Agentic AI Terminal / LLM Assistants

**Scope of AI Usage:**

- Assisting in translating the initial brief into structured PRD and MVP documents.
- Scaffolding boilerplate code (React components, basic layouts).
- Generating CSS variables based on extracted Chakra UI computed styles.
- Assisting with routine Tailwind utility mapping and basic Framer Motion configurations.

**Engineering Ownership & Judgment:**
While AI assisted in code generation, all core technical and architectural decisions were strictly driven and reviewed by me, including:

1. **System Architecture:** Opting for Next.js Route Handlers as a monolith backend over a separate server for deployment velocity.
2. **Database & Security:** Designing the Supabase Postgres schema and applying Row Level Security (RLS) allowing anonymous inserts but restricting reads.
3. **Code Organization:** Enforcing a Feature-Based Architecture (`src/features/`) to ensure scalability and separation of concerns.
4. **Design System:** Defining the exact typography registers, color tokens, and animation constraints in `DESIGN.md` before writing any code.

I have fully reviewed, tested, and can explain every line of code committed in this repository.

## Copyright Notice

All Invitato assets (photos, music, etc.) are provided solely for this recruitment
assessment and remain the property of Invitato. They must not be republished or reused
outside this process.
