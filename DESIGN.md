---
title: Invitato Hometask — Design Language
subtitle: Wedding Invitation (Ricky & Fellycia Template)
date: 2026-08-31
version: v1.0
status: Approved
sources:
  - https://invitato.net/template-rickyfelly/
---

## Creative North Star

**Modern, Elegant, & Minimalist Romance.**
The visual identity of this invitation relies on subtle elegance. It uses a muted, cool-toned color palette (silver-greys and deep slate blues) paired with classic serif typography. The design feels premium, quiet, and timeless. There are no loud colors or harsh contrast lines.

**Dual Typography Register:**
The design balances two distinct voices:

1. **The Classic Serif:** `Marcellus` (headings) and `Cormorant Upright` (body) provide a structured, formal, and highly readable foundation.
2. **The Romantic Script:** `Boheme Floral` acts as an accent (specifically for the "&" symbol and subtle decorative headers), breaking the rigidity of the serifs with a soft, hand-drawn touch.

## Typography

All fonts will be loaded via `next/font/google` or `next/font/local` to ensure zero Cumulative Layout Shift (CLS) and maximum performance.

- **Heading (`font-heading`):** `Marcellus`
  - Usage: Names, section titles (e.g., "Event Details", "Gallery").
  - Weight: Regular (400).
- **Body (`font-body`):** `Cormorant Upright`
  - Usage: Paragraphs, dates, venue addresses, RSVP forms.
  - Weights: Regular (400), Medium (500), Bold (700).
- **Accent/Script (`font-script`):** `Great Vibes` or `Alex Brush` (as Google Font alternatives if Boheme Floral is unavailable).
  - Usage: The word "and" between names, decorative introductory phrases.

## Color System

Extracted directly from the Chakra UI root variables of the reference template. These will be mapped to Tailwind CSS variables in `globals.css`.

| Token Name               | Hex Code  | Tailwind Variable | Role                                         |
| :----------------------- | :-------- | :---------------- | :------------------------------------------- |
| **Background Primary**   | `#D5DADE` | `--bg-primary`    | Main background color (soft silver-grey).    |
| **Background Secondary** | `#737373` | `--bg-secondary`  | Muted background for secondary sections.     |
| **Background Alt**       | `#FFFFFF` | `--bg-alt`        | White surfaces (cards, form backgrounds).    |
| **Overlay Opacity**      | `#323030` | `--bg-overlay`    | Dark overlay for modals or hero backgrounds. |
| **Main Text**            | `#2C3F4E` | `--text-main`     | Primary reading text (deep slate blue).      |
| **Secondary Text**       | `#737373` | `--text-muted`    | Subtle text, dates, or captions.             |
| **Alternative Text**     | `#FEFEFE` | `--text-alt`      | Text on dark backgrounds or primary buttons. |
| **Main Asset/Accent**    | `#2C3F4E` | `--color-accent`  | Primary buttons, icons, and active states.   |

## Layout & Elevation

- **Container:** Mobile-first design. On desktop, the content should be constrained to a mobile-sized wrapper (e.g., `max-w-md mx-auto`) to emulate the digital invitation experience, sitting on top of a blurred or solid primary background.
- **Elevation:** Flat by default. Use extremely subtle shadows (`shadow-sm` or `shadow-md` with low opacity) only for floating action buttons (like the music player) or overlapping cards (like the event details).
- **Border Radius:**
  - `rounded-none` or `rounded-sm` for structural elements.
  - `rounded-full` for icon buttons (music toggle) and pill-shaped CTAs.

## Motion & Transitions

- **Entrance:** Soft `fade-in` and `fade-in-up` as elements scroll into the viewport (powered by Framer Motion).
- **Hero/Cover:** The opening cover slides up or fades out smoothly upon clicking "Open Invitation".
- **Restraint:** Motion should feel cinematic and slow, not snappy or bouncy. Use ease-out curves with longer durations (e.g., `duration-700` or `duration-1000`).

## Component Mapping (shadcn/ui)

We will use `shadcn/ui` installed over Tailwind v4, strictly styled to match the above tokens.

- **Button:** Sharp or slightly rounded corners, using `--color-accent` as the primary background.
- **Form/Input:** Minimalist borders, floating labels or simple placeholders using `Cormorant Upright`. Focus states should use a subtle ring of `--color-accent`.
- **Toast:** Minimalist, appearing at the top or bottom center, using the primary background colors.

## Dos and Don'ts

### DO

- **Do keep it mobile-constrained:** Even on wide desktop screens, the main invitation content should sit inside a centered, mobile-width container (e.g., `max-w-md` or `max-w-lg`).
- **Do respect readability:** Always use `Cormorant Upright` for long-form text, dates, venue addresses, and form inputs.
- **Do embrace whitespace:** Let elements breathe. Use generous padding and margins to maintain the elegant, uncluttered feel.
- **Do make animations cinematic:** Use slow, graceful ease-out transitions (`duration-700` or `duration-1000`) for entrance effects.

### DON'T

- **Don't use script fonts for reading:** Never use `Boheme Floral` (or alternative script font) for paragraphs, important dates, or buttons. It is strictly a decorative accent.
- **Don't use bouncy or snappy motion:** Avoid spring animations or fast transitions. They break the calm, romantic mood.
- **Don't over-shadow:** Avoid heavy, dark drop shadows. If depth is needed, use flat layers or extremely transparent, soft shadows.
- **Don't introduce new colors:** Stick strictly to the muted silver-greys and deep slate blues. No pure blacks (`#000000`) or loud accents.
