---
name: travedise-design-system
description: The Travedise v2 design language — colour tokens, Ragmont and Inter Tight type, the 1280px column, desktop-first breakpoints, motion, and the catalogue of v2 components to reuse. Load before designing, building or reviewing any page or section.
---

# Travedise design system (v2)

The source of truth is `src/styles/global.css` (`@theme`). The visual reference — swatches, type
at real sizes, radii, easing — is `docs/design.html`; open it in a browser. If you add or change
a token, update both, in the same PR.

## Two palettes — use v2

`global.css` still holds the old Webflow palette (`navy` #091733, `slate`, `lime`, `surface`,
`line`). Every live page now uses the **v2** palette inside a `<div class="v2">`. New work uses v2
only; don't mix the two in one section.

| Token | Hex | Role |
|---|---|---|
| `v2-navy` | #101b2e | Dark sections, headings, primary buttons |
| `v2-cream` | #f7f5ef | Warm alternate section background |
| `v2-sky` | #47cdff | Accent — the CTA fill ("Plan your trip"). Use sparingly: one per view |
| `v2-sand` | #c4af8c | Step numerals, the dot between card facts |
| `v2-ember` | #c96a45 | The arrow disc on the closing CTA only |
| `v2-body` | #545c63 | Body copy on light backgrounds |
| `v2-muted` | #cbd8df | Body copy on navy |

A section's background is one of three surfaces — `white`, `cream`, `navy` — through
`<Section surface>`. A new colour means a new `@theme` token, not a hex in a class.

## Type

- **Display:** `font-display` = Ragmont (variable weight 100–900, width 75–150%, separate italic).
  Big headings and the italic emphasis phrase. The house pattern sets the *end* of a heading in
  italics: "Which coast, *and when*", "Want Ella *in your* route?". In content that is `titleEm`
  or `em`; in markup it is `<Emphasis text em>` or `<em class="italic">`.
- **Text:** `font-sans` = Inter Tight 400 / 500 / 600. Everything else.
- **Scale:** `text-h1`…`text-h6`, `text-body-lg`. They shrink at each breakpoint by themselves
  (h1 70 → 60 → 45 → 36px), so don't add your own responsive font sizes to headings.

## Layout

- `<Section surface bleed class innerClass>` (`src/components/v2/section.astro`) gives the
  background, the gutter and the column. Use it for every full-width section.
- `container-v2` — the 1280px column. `gutter-v2` — horizontal page padding (54px at 1440).
- **Desktop-first.** Write the desktop style bare, then override:
  `max-lg:` (≤991px), `max-md:` (≤767px), `max-sm:` (≤479px). Don't write mobile-first `md:` styles.
- Card grids become one horizontal snapping row on phones: `.v2-rail` inside `<Section bleed>`.
- Radii: `rounded-card` (20px) for cards and photos, `rounded-panel` (25px) for big panels.

## Motion

- Scroll-in: `<Reveal as="h2" from="rise" delay={100}>` (`src/components/ui/reveal.astro`).
  v2 pages use `from="rise"`. Stagger siblings by about 80–100ms.
- Eases: `ease-out-quart` / `ease-out-quint` for entrances, `ease-out-quad` for button press,
  `ease-in-out-sine` for loops.
- Hover lifts only behind `@media (hover: hover)`. Anything larger than a hover respects
  `prefers-reduced-motion`.

## Components to reuse (`src/components/v2/`)

Check here before you write new markup.

| Component | What it is |
|---|---|
| `section` | Surface + gutter + 1280 column |
| `site-nav` | Floating nav over every hero: wordmark, glass pill of links, trip CTA |
| `mobile-menu` | Phone hamburger and full-screen panel (below `md`) |
| `hero-scrim` | Gradient that keeps hero text legible over a photo |
| `plain-hero` | Short dark hero for pages with no photograph |
| `contained-cta` | Navy panel inset in a white page — "is this the right route?". Heading via slot |
| `cta-band` | Closing call to action with a photo bleeding off the bottom |
| `footer-wide` | The v2 footer: closing statement, newsletter, link columns, legal row |
| `gallery` | Endless photo strip |
| `questions`, `question-list`, `accordion-row` | The FAQ band and the open-one-at-a-time list |
| `buttons/pill-link` | The pill button: `sky`, `navy`, `outline`, … fills |
| `buttons/split-pill-link` | Wide pill, label left, arrow right — a destination button |
| `buttons/badge-link` | Label + round arrow badge in a hairline rim, for dark panels |
| `buttons/quiet-link` | Underlined text link opposite a section heading |
| `blog/emphasis` | Sets the last occurrence of `em` in `text` in italics |

Page-specific parts live in `home/`, `about/`, `blog/`, `package/`, `packages/`, `places/`,
`plan/`, `when-to-go/`. Reuse them across pages when they fit rather than copying.

## Rules that keep the site consistent

- Tailwind utilities only; no new CSS files. Shared component CSS goes in `global.css`
  `@layer components` with a comment saying why.
- Photos are real travel photography of Sri Lanka, with honest `alt` text. No stock clichés,
  no illustrations in place of photos.
- One accent (`v2-sky`) button per view. Navy and white carry the rest.
