# Clone Audit — Sections 4–10 measured spec

Source: `scrape/live/audit/sections-deep.json`, captured from the live reference over CDP at
1440×900 and 390×844 after opening the invitation and scrolling through every react-reveal.
All `y` values are relative to the top of their own section. Desktop column = 500px at x=940.

Companion to `docs/CLONE-AUDIT.md`. Sections 0–3 are already built and verified; this file is the
build spec for the rest.

## Cross-cutting facts

- **`qrinvitato-*.png` is Invitato's logo/wordmark, NOT a QR code.** It renders 85×27.6 in section 4
  and 140×45.5 in the footer. No QR element (img/svg/canvas) exists anywhere in section 4 — verified
  by scanning every element, not just text-bearing ones. This matches the on-page note
  `*) QR Code hanya tersedia pada paket Digital Guestbook`. Do not invent a QR.
- **Shared CTA style** (sections 1,2,3,4,5,7,8): height 32px, padding 8px 16px, radius 5px,
  Cormorant Upright 18px/500 lh21.6, `#FEFEFE` on `#2C3F4E`. Already implemented as
  `templateButtonClass` in `src/features/landing/components/template-button.ts`.
- **Marcellus headings carry `letter-spacing: 1px`**; Cormorant body text is `normal`.
- **Section titles** are Marcellus 32px/400 lh32 `#737373` UPPERCASE (except section 6's
  "A PORTRAIT OF" which is 19px, and section 10's "Thank you," which is 24px `#FEFEFE`).
- Sections 4 and 5 have large empty gaps that contain **no** element at all (S4: y 376→552 = 176px,
  and y 702.5→905.5 = 203px). Reproduce as vertical spacing; a hairline divider (an `<hr>` with only
  a border) cannot be ruled out but was not observable.

---

## Section 4 — event details + entrance access card
h **1919.6** desktop / **1999.1** mobile · bg `#D5DADE` · padding 0 · text block 425px desktop
(= column − 7.5% each side) / 331.5px mobile.

| y (desktop) | element | style |
|---|---|---|
| 46 | intro paragraph, h=85.5 (3 lines) | Cormorant 19px/500 lh28.5 `#2C3F4E` center — "Together with joyful hearts and the grace of God, we cordially request the honor of your presence…" |
| 251.5 | "Date:" | Cormorant 17px/500 lh25.5 `#737373` |
| 277 | "Thursday, 26 December 2024", h=99 (2 lines) | Cormorant **33px/700** lh49.5 `#2C3F4E` |
| — | *gap 176px* | |
| 552 | "Holy Matrimony:" | Cormorant 17px/**700** lh25.5 `#737373` |
| 577.5 | "11.00 WIB", margin-bottom 16px | Cormorant **32px/500** lh48 `#2C3F4E` |
| 641.5 | venue name, margin-bottom 4px | Cormorant 19px/**700** lh28.5 `#2C3F4E` |
| 674 | address (h 28.5 desktop / 57 mobile) | Cormorant 19px/500 lh28.5 `#2C3F4E` |
| — | *gap 203px desktop / 231.5px mobile* | |
| 905.5 | "Wedding Reception:" | as "Holy Matrimony:" |
| 931 | "18.00 WIB" | as above |
| 995 | "MAC Ballroom" | as venue name |
| 1027.5 | reception address, h=57 | as address |
| 1116.5 | **See Location** button | shared CTA, w=117.9 |
| 1250.5 | access card, **321.3 × 220**, `position:absolute`, z 1, bg `qrcover-*.jpg` | Montserrat 16px base |
| 1351.5 | "Entrance Access Card" | Montserrat **10px/700** lh15 `#FFF` UPPERCASE, x offset +16 from card |
| 1378.5 | "Ricky & Fellycia", margin-top 12px | Montserrat **16px/700** lh24 `#FFF` |
| 1403.5 | "MAC Ballroom", margin-top 1px | Montserrat 10px/500 lh15 `#FFF` |
| 1419.5 | "Thursday, 26 December 2024", margin-top 1px | Montserrat 10px/500 lh15 `#FFF` |
| 1482.5 | "Dear Mr. /Mrs. /Ms." — right-hand block, w=152.3, x=1182.4, margin-top 8px | Montserrat 10px/400 lh15 **`#000`** left |
| 1497.5 | guest name ("Invitato") | Montserrat **14px/700** lh21 `#000` |
| 1526.5 | "Information", margin-top 8px | Montserrat 10px/400 lh15 `#000` |
| 1541.5 | guest desc ("Vendor") | Montserrat 12px/700 lh18 `#000` |
| 1559.5 | "Valid for person(s)" + span "(5)" | 12px/700 lh18 `#000`; the "(5)" span is **`#A1425C`** |
| 1611.5 | "Please show the QR Code to enter the event venue", w=289.3, margin-top 16px | Montserrat 10px/400 lh15 `#000` center |
| 1659.5 | `qrinvitato` **logo** 85 × 27.6, centered | — |
| 1715.1 | "Please download the above, to simplify the scanning process…" with a bold `<b>` "Entrance Access Card" inline, w=393.2, h=46.5 | Cormorant 17px/500 lh25.5 `#2C3F4E`; the `<b>` is 17px/**700** |
| 1786.1 | **Download Access Card** button, padding **6px 24px**, margin-top 6px, w=203.9 | shared CTA (note the different padding) → `/e-ticket/?to=<name>&code=<code>` |
| 1818.1 | "*) QR Code hanya tersedia pada paket Digital Guestbook", padding-top 12px, h=37.5 | Cormorant 17px/**700** lh25.5 `#2C3F4E` center |

Mobile: same order; the right-hand guest block moves to x=187.4, text widths become 331.5, and the
section is 79.5px taller overall.

## Section 5 — RSVP
h **741.8** desktop / **758.6** mobile · bg transparent · padding `32px 0` · fields 400px wide at x=990
(= column − 50px each side).

| y | element | style |
|---|---|---|
| 41 | "RSVP" title | Marcellus 32px/400 lh32 `#737373` UPPERCASE center |
| 106 | "We'd love to hear from you! Please fill out the confirmation below:", w=500, margin-top 24px, h=57 | Cormorant 19px/500 lh28.5 `#2C3F4E` center |
| 187 | label "Name:", margin `24px 0 8px` | Cormorant 19px/500 lh22.8 `#2C3F4E` left |
| 217.8 | helper "*) Guest can only confirm 1 name due to personalized RSVP", margin `4px 0 8px` | Cormorant **14px/400** lh16.8 `#2C3F4E` |
| 242.6 | text input, **400 × 40**, padding `0 16px`, radius 5px | Cormorant 17px/500 lh25.5 `#2C3F4E` |
| 306.6 | label "Phone Number :" | as "Name:" |
| 337.4 | country-code `<select>` 85 × 40, padding `0 32px 1px 16px`, radius `5px 0 0 5px` | Cormorant 17px/500 |
| 337.4 | number input 315 × 40 at x=1075, radius `0 5px 5px 0` | Cormorant 17px/500 |
| 401.4 | label "Address:" | as above |
| 432.2 | text input 400 × 40 | as above |
| 496.2 | label "Email:" | as above |
| 527 | text input 400 × 40 | as above |
| 591 | label "Will you attend the wedding?" | as above |
| 621.8 | two attendance buttons, each **192 × 32**, padding `0 12px`, radius **6px**, 17px/500 lh20.4 `#FEFEFE` | "Gladly Attend" at x=990, "Unable to Attend" at x=1198 (16px gutter) |
| 677.8 | **Submit** (`type=submit`), w=82.2, margin-top 24px | shared CTA |

Note: attendance buttons use radius **6px** and 17px text — NOT the shared CTA's 5px/18px.

## Section 6 — gallery ("A PORTRAIT OF …")
h **945.8** desktop / **839.9** mobile · bg `#D5DADE` · padding `64px 24px 46px`.

- Header repeats the section-0 name lockup: "A PORTRAIT OF" Marcellus **19px**/400 `#737373` UPPERCASE
  at y=64, then "Ricky" / Boheme Floral 66px "and" (y=95, h=79.2) / "Fellycia" Marcellus 30px at y=119.6.
- Quote at y=182.2: `“True love is when both people think they're the lucky one“` Cormorant 19px/500
  lh28.5 `#2C3F4E`, w=452.
- Hashtag at y=210.7: Cormorant **18px/300** lh21.6 `#2C3F4E`.
- `curve.svg` overlay at y=−66.2, 495 × 328.5 (overflows above the section).
- Carousel: slide image **384.2 × 576.5**, radius **16px**, at y=258.3. Two nav buttons 34 × 138,
  padding `50px 10px`, at y=477.5 (left and right edges). One extra 68 × 68 button at y=766.8
  (padding 20px) — the react-image-gallery play/fullscreen control.
- Thumbnails: 5 buttons **75 × 50**, radius **8px**, at y≈844, each containing an img ≈67 × 50.
- Slides cycle `1-…jpg` … `5-…jpg`; the initial slide is `1-aee34cc2…jpg`.
- **No lightbox** — `ril__*` CSS is bundled but never opens.

## Section 7 — pre-wedding + live streaming
h **1020** desktop / **978** mobile · bg `#D5DADE` · padding `32px 0 64px`.

Two identical blocks:
| y | element |
|---|---|
| 48 | title "Pre Wedding" — Marcellus 32px/400 `#737373` UPPERCASE, w=500 |
| 112 | YouTube **iframe 400 × 225**, radius **8px** |
| 353 | fallback copy, w=400, h=65, padding `8px 12px 0` — Cormorant 19px/500 `#2C3F4E`: "Should you have any issues with video above, then please click on the button below:" |
| 434 | **Open via Youtube** button, w=154.3 — shared CTA |
| 522 | title "Live Streaming" |
| 586 | iframe 400 × 225 (note: radius 0 on the second one in the capture) |
| 827 | fallback copy |
| 908 | Open via Youtube button |

Video ids: pre-wedding `dt25SFw8H4Y`, live `y3MLiFHAf4w`.

## Section 8 — wedding gift
h **451.5** at both widths · bg `#D5DADE` · padding `32px 0`.

| y | element |
|---|---|
| 114 | "Wedding Gift" title, w=400 — Marcellus 32px/400 `#737373` UPPERCASE |
| 162 | body, w=400, h=85.5, padding `0 12px` — Cormorant 19px/500 `#2C3F4E`: "For beloved ones who may want to show your sincere love by sending a gift, please…" |
| 301.5 | **Send Gift** button, w=97 — shared CTA. Opens the bank/address modal (see `behavior.md` §11) |

## Section 9 — kind words (wishes)
h **908.6** at both widths · bg `#D5DADE` · padding 0 · content 400px wide.

| y | element |
|---|---|
| 32 | "Kind Words" title, padding-bottom 8px, h=40 | Marcellus 32px/400 `#737373` UPPERCASE |
| 72 | body, padding-top 20px, h=77 | Cormorant 19px/500 `#2C3F4E`: "Please leave your sincere prayers and wishes to us and our families:" |
| 183 | label "Your Name :" | Cormorant 19px/500 lh22.8 |
| 213.8 | text input 400 × 40, padding `0 16px`, radius 5px | Cormorant 17px/500 |
| 267.8 | label "Dear Ricky & Fellycia..." | as above |
| 298.6 | **textarea 400 × 80**, padding `8px 16px`, radius 5px | Cormorant 17px/500 |
| 410.6 | **Submit** button, w=82.2 | shared CTA |
| 403.7 | `curve.svg` 880 × 584 decorative overlay |
| 478.6+ | wish entries, repeating every **167.2px**: name (Cormorant **17px/700** lh25.5 `#2C3F4E`, w=53.3), message (**16px/500**, w=376, h=72), timestamp (**13.5px/400** lh20.3 `#737373`, format `13 Apr 2025 \| 02:41 AM`) |

The reference list is **seeded vendor data**. Per `AGENTS.md` this clone renders an honest empty state
backed by Supabase instead — a deliberate, documented deviation.

## Section 10 — footer
h **954.5** desktop / **904.1** mobile · bg transparent · padding 0.

| y | element |
|---|---|
| 0 | photo block 500 × 810, bg `Footer Portrait.jpg` |
| 32 | "Thank you," — Marcellus **24px**/400 `#FEFEFE` UPPERCASE, padding `50px 0 25px`, h=99 |
| 163.6 | name lockup: "Ricky" / Boheme Floral 66px "and" (y=139) / "Fellycia" — Marcellus 30px `#FEFEFE` |
| 226.2 | "#RickyFellinlove" — Cormorant **20px/500** `#FEFEFE` |
| 587.5 | `curve.svg` 500 × 331.8 |
| 822 | `qrinvitato` **logo** 140 × 45.5 |
| 867.5 | "Created with love by Invitato" — Cormorant 14px/500 `#FEFEFE`, w=452 |
| 900.5 | "Song by James TW - Speechless" | same |
| 921.5 | "© 2026 Ricky & Fellycia. All Right Reserved" | same |
