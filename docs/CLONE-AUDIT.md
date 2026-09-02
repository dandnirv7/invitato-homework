# Clone Audit — invitato.net/template-rickyfelly

Phase 1 output. Evidence gathered by driving **real headless Chrome over CDP** against the live
reference (not the in-app browser, which freezes rAF and produces false results).

Raw evidence: `scrape/live/audit/` — `sections-{desktop,mobile}.json`, `typography.json`,
`design-tokens.json`, `assets.json`, `network-*.json`, `behavior.md`, and per-section screenshots
(`{desktop,mobile}-<n>-<name>.png`, `*-cover-before.png`, `*-after-open.png`, `*-full.png`).

Reference stack: Gatsby 5.13.1 SPA + **Chakra UI v2** (Emotion). Reveal = **react-reveal**
(inline `opacity:0→1`, `animation-duration:1000ms`, `fill-mode:both`). Gallery =
**react-image-gallery**. `react-image-lightbox` CSS is bundled but never opens.

---

## 1. SECTION INVENTORY

11 top-level sections in DOM order. Heights are measured `getBoundingClientRect().height` in px.
Total document height: **9870 desktop / 9561 mobile** (after the cover is opened and reveals run).

| #  | Section                | Purpose                            | Visual                                                                                                                        | Interaction                                                                                                     | Animation                                                            | Desktop        | Mobile         | Assets                                                     |
| -- | ---------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------- | -------------- | ---------------------------------------------------------- |
| 0  | cover-greeting         | Gate + post-open "Dear …" greeting | Pre-open: full-bleed cover photo, white curve line-art, "RICKY _and_ FELLYCIA", hashtag. Post-open: greeting on `#D5DADE`, names, verse, small portrait card | Pre-open CTA is the **bouncing scroll arrow** (`div.animation-up-and-down`) — no labelled button. Click ⇒ mounts invitation + `audio.play()` | Arrow: `MoveUpDown 3s ease-in-out infinite` (`translateY(20px)` at 50%). Reveals 1000ms | 900 (=viewport) | 889 (=viewport) | `cover.jpg` (mobile), `desktop tb.jpeg` (desktop backdrop), `Welcoming Portrait.jpg`, `curve.svg` |
| 1  | couple-groom-bride     | Groom & bride profiles             | Two stacked portrait cards, full names, "The Son/Daughter of …", IG buttons                                                     | IG buttons open `instagram.com/<handle>`                                                                        | react-reveal fade 1000ms                                             | 1350           | 1227           | `Groom Portrait.jpg`, `bride.jpg`                          |
| 2  | love-story             | Teaser for the story               | Heading + one-liner + "Our Love Story" button; mostly flat `#D5DADE`                                                            | Button handler (modal/anchor — UNVERIFIED)                                                                      | react-reveal                                                         | 345            | 345            | none                                                       |
| 3  | countdown              | "Counting the Days!"               | Dark photo band, 4 numerals `D:H:M:S`, labels, "Remind Me" button                                                               | Ticks ~1s toward akad epoch **1798160400**; "Remind Me" = calendar (UNVERIFIED)                                  | react-reveal + 1s tick                                               | 333            | 260            | `BG Ricky.jpg`                                             |
| 4  | event-details-qr       | Akad/reception + entrance QR       | Date, two events (11.00 WIB GBT Kristus Alfa Omega; 18.00 WIB MAC Ballroom), "See Location", QR Access Card + download          | "See Location" opens maps (`https://maps.app.goo.gl/ujwonyWq93rBS6CX9`); download ⇒ `/e-ticket/?to=…&code=…`      | react-reveal                                                         | 1920           | 1999           | `qrcover-*.jpg`, `qrinvitato-*.png`, Montserrat micro-text  |
| 5  | rsvp                   | Attendance confirmation            | Form on white: Name, country-code select + phone, Address, Email, two attendance buttons, Submit                                 | Client validation blocks incomplete submit (no request fired). Reference endpoint = Google Apps Script macro     | react-reveal                                                         | 742            | 759            | none                                                       |
| 6  | gallery-portrait       | "A PORTRAIT OF …"                  | Carousel: 1 large slide (radius 16px) + 5 thumbnails (75×50, radius 8px), left/right arrows, no bullets, no fullscreen           | Arrows/thumbs change slide. **No lightbox** (`ril__outer` never appears)                                         | react-reveal; icons/thumbs `all .3s ease-out`                        | 946            | 840            | `MRBL-RF-PW-36.jpg`, `static/1..5-*.jpg`                   |
| 7  | prewedding-livestream  | Two YouTube videos                 | Two embedded players, each with an "Open via Youtube" fallback link                                                              | YouTube iframe controls; fallback links open `watch?v=dt25SFw8H4Y` (prewed) / `y3MLiFHAf4w` (live)                | react-reveal                                                         | 1020           | 978            | YouTube embeds                                             |
| 8  | wedding-gift           | Bank transfer + address            | Heading + "Send Gift" button                                                                                                    | Opens Chakra **slide modal**: BCA `11223344`, BRI `44332211`, address, "Copy Account Number"/"Copy Address", + a Confirmation mini-form (Name, Phone) | react-reveal; modal slide; copy toast UNVERIFIED                     | 452            | 452            | none                                                       |
| 9  | wishes-kind-words      | Guest messages                     | Wishes form (Your Name + textarea "Dear Ricky & Fellycia…") above a list of entries with `13 Apr 2025 \| 02:41 AM` timestamps    | Submit blocked by client validation in test ⇒ endpoint UNVERIFIED. Reference list is **seeded vendor data**      | react-reveal                                                         | 909            | 909            | none                                                       |
| 10 | footer-thankyou        | Closing                            | Dark footer photo, "THANK YOU", names, hashtag, Invitato credit                                                                  | —                                                                                                               | react-reveal                                                         | 954            | 904            | `Footer Portrait.jpg`                                      |

### Fixed / sticky chrome (not sections)

| Element              | Position                                                        | z   | Size   | Style                        |
| -------------------- | --------------------------------------------------------------- | --- | ------ | ---------------------------- |
| Desktop left backdrop | `fixed; left:0; right:500px; top:0; bottom:0` — **only ≥1280px** | 2   | vw−500 | `desktop tb.jpeg`            |
| Language menu pill   | `fixed; right:32px`; `bottom:16px` ≥768 / `bottom:60px` <768      | 99  | pill   | bg `#737373`, shows EN/ID    |
| Music toggle         | `fixed; left:48px; bottom:12px`                                   | 999 | 32×32  | bg `#737373`, white speaker  |
| Nav-drawer toggle    | `fixed; left:12px; bottom:12px`                                   | 999 | 32×32  | bg `#737373`                 |
| Nav drawer           | Chakra `role=dialog`: Access Card, Groom & Bride, Wedding Details, RSVP, Live Streaming, Wedding Gift | 5500 | — | anchor jumps |

---

## 2. GLOBAL DESIGN SYSTEM

All values below were read from `getComputedStyle` on the live site — they confirm (not replace)
the earlier scrape hints.

### Fonts

| Role             | Family             | Weights            | Sizes (px)                       | Notes                                        |
| ---------------- | ------------------ | ------------------ | -------------------------------- | -------------------------------------------- |
| Headings         | **Marcellus**      | 400                | 32 / 30 / 28 / 24 / 20 / 19      | `text-transform:uppercase`, `letter-spacing:1px` |
| Body             | **Cormorant Upright** | 500 (primary)   | 19 (lh 28.5) / 18 / 17 / 16 / 14 / 13.5 | also 700, 400, 300; body colour `#2C3F4E`  |
| Countdown numerals | Cormorant Upright | 700               | 54 (lh 81)                       | colour `#FEFEFE`                             |
| "and" accent     | **Boheme Floral**  | 300                | 66                               | local TTF, decorative only                   |
| QR / e-ticket    | **Montserrat**     | 400–700            | 10–16                            | micro-text on the access card                |
| Demo drawer only | Poppins            | —                  | —                                | **do not clone** (Invitato preview tooling)  |

Chakra theme tokens: `fontSizes.heading=32px`, `body=19px`, `body_lv2=17px`, `and=66px`;
`fontWeights.heading=400`, `body=500`, `and=300`.

### Colors

| Token              | Hex       | Usage                                       |
| ------------------ | --------- | ------------------------------------------- |
| `bgPrimary`        | `#D5DADE` | page ground (soft silver-grey)              |
| `bgSecondary`      | `#737373` | muted bands, floating buttons               |
| `secondaryText`    | `#737373` | captions, dates                             |
| `bgAlternative`    | `#FFFFFF` | cards, form surfaces                        |
| `mainAsset`/`mainText` | `#2C3F4E` | primary text, accents, buttons          |
| `bgOpacity`        | `#323030` | dark overlay                                |
| `alternativeText`  | `#FEFEFE` | text on dark/photos                         |
| body default       | `#1A202C` | Chakra `gray.800`                           |
| borders            | `#E2E8F0` | Chakra `gray.200`                           |
| demo pink          | `#A1425C` | "Imagination Room" only — **do not clone**  |

### Radii, shadows, spacing

- Radii observed: `3 / 5 / 6 / 8 / 16 / 24 / 25px`, `50%`, `9999px`, plus asymmetric corner pills
  (`50px 5px` style). Gallery slide 16px, thumbnails 8px.
- Shadows: Chakra `sm / md / xl / 2xl`; `2xl` on the invitation column.
- Spacing: Chakra rem scale (4px base).

### Container widths & breakpoints

- Invitation column: **500px** at ≥768px, **100%** below. Inner max-widths 370px and 140px.
- Structural breakpoints (verified by re-measuring at 360/390/768/1024/1280/1440/1920):
  - `<768` — full-width single column; language pill `bottom:60px`; cover = full-bleed `cover.jpg`.
  - `768–1279` — centered 500px column; **no left photo backdrop**.
  - `≥1280` (Chakra `xl`) — **split view**: `position:fixed` left backdrop sized `vw − 500 − scrollbar`
    at `z-index:2`, right 500px column scrolls.
- Chakra `em` scale: sm 480 / md 768 / lg 992 / xl 1280 / 2xl 1536.
- z-index ladder: backdrop 2 → gallery icons 4 → language 99 → floating toggles 999 → lightbox 1000
  → portals 5500.

### Recurring decorative elements

White curve line-art (`curve.svg`) on the cover; dark photo bands with `#FEFEFE` type
(countdown, footer); rounded portrait cards; small `#737373` circular floating controls.

### Recurring animation patterns

1. **react-reveal** scroll entrance — `opacity:0→1`, 1000ms, `fill-mode:both`, one-shot, per section.
2. **MoveUpDown** — 3s `ease-in-out infinite`, `translateY(20px)` at 50% (cover arrow).
3. **animation-heart** — 1s pulse for heart accents.
4. Chakra control transition — `background-color,border-color,color,fill,stroke,opacity,box-shadow,transform .2s ease` (and `.15s cubic-bezier(0,0,0.2,1)`).
5. Gallery icons/thumbs — `all .3s ease-out`; icon hover colour `#337ab7`.
6. Document scroll is `scroll-behavior:auto` — **not** smooth.

---

## 3. ASSET INVENTORY

Source of truth for media is `scrape/media/` (all originals downloaded from the live site or
ImageKit). `public/assets/` already holds PNG conversions of some of them; keep those, add gaps.

| Asset (live)                            | Type   | Section        | In `scrape/media/`?            | In `public/assets/`?     | Action                                            |
| --------------------------------------- | ------ | -------------- | ------------------------------ | ------------------------ | ------------------------------------------------- |
| `cover.jpg`                             | jpg    | 0 cover mobile | ✅ `cover.jpg__Cover_.jpg`      | ✅ `cover-portrait.png`   | use existing                                      |
| `desktop tb.jpeg`                       | jpeg   | 0 backdrop ≥1280 | ✅ `desktop_tb.jpeg__…`       | ✅ `desktop-landscape.png` | use existing                                    |
| `COVER RICKY FELLY.jpg`                 | jpg    | share/alt      | ✅                              | ❌                        | optional (OG alt)                                 |
| `Welcoming Portrait.jpg`                | jpg    | 0 greeting     | ✅                              | ✅ `welcoming-portrait.png` | use existing                                    |
| `BG Ricky.jpg`                          | jpg    | 3 countdown    | ✅                              | ✅ `welcoming-background.jpg` (byte-identical) + `counting-days-landscape.png` | use existing |
| `Groom Portrait.jpg`                    | jpg    | 1 groom        | ✅                              | ✅ `groom.png`            | use existing                                      |
| `bride.jpg`                             | jpg    | 1 bride        | ✅                              | ✅ `bride.png`            | use existing                                      |
| `MRBL-RF-PW-36.jpg`                     | jpg    | 6 gallery slide | ✅                             | ❌                        | **copy in**                                       |
| `static/1..5-*.jpg`                     | jpg    | 6 gallery thumbs | ✅ (5 files)                  | ⚠️ only `gallery-1..3.png` | **copy in gallery-4, gallery-5**                |
| `qrcover-*.jpg`                         | jpg    | 4 QR card bg   | ✅                              | ❌                        | **copy in**                                       |
| `qrinvitato-*.png`                      | png    | 4 QR image     | ❌ → ✅ **downloaded this session** (`scrape/media/static_8_qrinvitato.png`, 92 KB) | ❌ | **copy in** |
| `curve-*.svg`                           | svg    | 0 cover ornament | ✅ (760 KB)                   | ❌                        | **copy in** (or inline a trimmed path)            |
| `bg-sound-*.mp3`                        | mp3    | global audio   | ✅ (7.5 MB)                     | ❌                        | **copy in**                                       |
| `favicon.png`                           | png    | global         | ✅                              | ⚠️ `src/app/favicon.ico`  | keep existing                                     |
| Marcellus woff2                         | font   | global         | ❌ → ✅ **downloaded** (`public/fonts/google/`, 2 files) | — | self-host via `next/font/local` |
| Cormorant Upright woff2 (300–700)       | font   | global         | ❌ → ✅ **downloaded** (15 files) | —                       | self-host via `next/font/local`                   |
| Montserrat woff2 (400–700)              | font   | 4 QR card      | ❌ → ✅ **downloaded** (5 files) | —                        | self-host via `next/font/local`                   |
| Boheme Floral                           | ttf    | "and" accent   | ✅ `scrape/fonts/BohemeFloral.ttf` | ✅ `public/fonts/BohemeFloral.ttf` | use existing |

Nothing needs to be recreated in CSS/SVG except the small speaker/menu glyphs (lucide equivalents).

### Failed / notable requests on the reference

- `invitato.id/api/fonts?type=FONT_LIST|FONT_RECOMMENDATION` → **HTTP 500** (their server; non-blocking).
- `fonts.googleapis.com` / `fonts.gstatic.com` → **200, reachable** from this machine (this supersedes
  an older note that they were blocked). We still self-host for deterministic rendering.
- Guest API `script.google.com/macros/...` → 302 → `script.googleusercontent.com` 200 (~9–15s), SWR-cached.
- One `ERR_ABORTED` on the mp3 is normal HTTP 206 range churn.

---

## 4. BEHAVIOUR MODEL (implementation contract)

1. **Boot** — cover + language pill render immediately; the rest is not mounted. No branded preloader.
2. **Cover gate** — the bouncing arrow is the open CTA. On click: mount/expand the invitation
   (`scrollHeight` 900 → ~7300 → ~9870 as reveals finish) **and** call `audio.play()`.
   Body is *not* overflow-locked; the gate works because content isn't mounted yet.
3. **Audio** — one `<audio loop>`, `autoplay=false`, started by the open handler. Mute toggle =
   bottom-left 32×32 `#737373` button at `left:48px; bottom:12px`, `z-index:999`; toggles `paused`.
4. **Language** — pill `fixed right:32px` (`bottom:16px` ≥768 / `60px` <768), bg `#737373`, shows
   current code. Items: `id` "Bahasa Indonesia", `en` "English". Selecting rewrites `?lang=` via
   history API (no reload), flips `<html lang>`, re-renders every string. Initial value read from
   `?lang=`, default `en`. **No localStorage key.**
5. **Countdown** — four Cormorant 54px/700/`#FEFEFE` numerals + labels + "Remind Me". Target =
   akad epoch **1798160400**, ticks ~1s. (The reference's printed date text still says
   "Thursday, 26 December 2024" — a template inconsistency; we keep the live epoch so the numbers
   match the reference, and keep the printed date string as the reference shows it.)
6. **Scroll & reveal** — `scroll-behavior:auto`; per-section one-shot fade 0→1 over 1000ms on
   entering the viewport. Anchor navigation comes from the nav drawer.
7. **Gallery** — carousel only: arrows + 5 thumbnails, **no lightbox**.
8. **RSVP** — Name / country-code select + phone / Address / Email / two attendance buttons
   ("Gladly Attend", "Unable to Attend") / Submit. Client validation blocks incomplete submits.
9. **Wishes** — "Your Name" + textarea (`Dear Ricky & Fellycia…`) + Submit, above a timestamped list.
10. **Gift** — "Send Gift" opens a slide modal: Bank Transfer (BCA `11223344` / Ricky Ravanelli, S.E.;
    BRI `44332211` / Fellycia Indriyani Pratama, S.I.Kom.), copy buttons, physical address + copy,
    and a Confirmation mini-form (Name, Phone Number).
11. **Location / e-ticket** — "See Location" opens the maps link; "Download Access Card" →
    `/e-ticket/?to=<name>&code=<code>`.
12. **Videos** — prewedding `dt25SFw8H4Y`, livestream `y3MLiFHAf4w`, each with an "Open via Youtube" fallback.
13. **Dark mode** — `chakra-ui-color-mode` in localStorage, default light, **no visible toggle**.

### Deliberate deviations (required by this repo's hard rules)

| Reference behaviour                        | Our behaviour                          | Why                                                        |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------------------------- |
| Wishes list shows seeded vendor entries    | Honest empty state until real rows exist | `AGENTS.md`: never seed fake wishes/RSVPs                 |
| RSVP/wishes POST to a Google Apps Script   | POST to our Supabase route handlers    | project stack; PRD requires DB persistence + RLS           |
| "Imagination Room" demo drawer (`#A1425C`) | Not implemented                        | Invitato's template-preview tooling, not part of the product |

### Unverified (must not be guessed during implementation)

RSVP/wishes submit endpoint + payload + success/error UI; "Remind Me" calendar behaviour;
"Our Love Story" button target; copy-to-clipboard toast text; gallery keyboard nav; countdown
expiry state (target is in the future).

---

## 5. IMPLEMENTATION PLAN

Foundation first, then one section at a time; each section is validated (visual + behavioural,
desktop **and** mobile, screenshot-compared against `scrape/live/audit/`) before the next starts.

| Step | Scope | Key work | Validate against |
| ---- | ----- | -------- | ---------------- |
| F0   | Assets | Copy missing media into `public/assets/` (gallery main + 4/5, qrcover, qrinvitato, curve.svg, bg-sound.mp3). Keep existing files. | `assets.json` |
| F1   | Fonts | Replace `next/font/google` with `next/font/local` for Marcellus, Cormorant Upright (300–700), Montserrat; keep Boheme Floral TTF as `--font-script`. Drop Great Vibes (wrong face). | computed `font-family`/sizes vs `typography.json` |
| F2   | Tokens | Fix `globals.css`: self-referential `--font-heading`, add Chakra greys (`#1A202C`, `#E2E8F0`), radii set, shadow set, z-index ladder, 500px column width, breakpoints 480/768/992/1280/1536. | `design-tokens.json` |
| F3   | Shell | Split-view layout: fixed left backdrop ≥1280 (`vw−500`), right 500px column; 768–1279 centered column; <768 full width. Floating controls (music, nav) + language pill at the audited offsets/z-index. | `desktop-full.png`, `mobile-full.png` |
| F4   | Motion | react-reveal equivalent via already-installed `framer-motion` (1000ms one-shot fade), `MoveUpDown` 3s arrow loop, reduced-motion safe. | `behavior.md` §6 |
| F5   | i18n | `?lang=` dictionary (en default / id), `<html lang>` flip, history-API rewrite, no localStorage. | `behavior.md` §4 |
| F6   | Audio | Single looping `<audio>`, started by the cover-open handler, mute toggle button. | `behavior.md` §3 |
| S0   | Cover + greeting | Cover photo, curve ornament, names with Boheme Floral "and", hashtag, bouncing arrow gate; post-open greeting card. | `{desktop,mobile}-cover-before.png`, `-after-open.png`, `-0-cover-greeting.png` |
| S1   | Couple | Two portrait cards, names, parents line, IG buttons. | `*-1-couple-groom-bride.png` |
| S2   | Love story | Heading + one-liner + button. | `*-2-love-story.png` |
| S3   | Countdown | Dark band, 4 numerals, labels, Remind Me; reuse `use-countdown.ts` retargeted to 1798160400. | `*-3-countdown.png` |
| S4   | Event + QR | Date, two events, See Location, QR access card + download link. | `*-4-event-details-qr.png` |
| S5   | RSVP | Form wired to `POST /api/rsvp` (Supabase), client + server validation, attendance buttons. | `*-5-rsvp.png` |
| S6   | Gallery | Embla carousel, 1 slide + 5 thumbs, arrows, radii 16/8, no lightbox. | `*-6-gallery-portrait.png` |
| S7   | Videos | Two YouTube embeds + fallback links. | `*-7-prewedding-livestream.png` |
| S8   | Gift | Send Gift ⇒ slide modal, banks, copy buttons, address, confirmation mini-form. | `*-8-wedding-gift.png` |
| S9   | Wishes | Form ⇒ `POST /api/wishes`, list ⇒ `GET /api/wishes`, honest empty state. | `*-9-wishes-kind-words.png` |
| S10  | Footer | Dark photo, THANK YOU, names, hashtag, credit. | `*-10-footer-thankyou.png` |
| V1   | Final validation | Full-page desktop + mobile compare, `?lang=id`, every interactive element, overflow/scrollbar check, `pnpm type-check` + `pnpm lint`. | all of the above |
