---
name: travedise-design-system
description: The Travedise Standard for agents — principles, colour tokens, type, photos chosen by colour, the drawn icon sets, motion (Lenis + motion.dev) and the components to reuse. Load before designing, building or reviewing any page, section or component.
---

# Travedise design system

Calm, warm and specific: one warm neutral hue, real photographs carrying the colour, a serif for
what we say and a grotesk for what you do, content that arrives slowly while the interface answers
at once. The human reference is `docs/design.html` (open it in a browser). The source of truth for
every value is `src/styles/global.css`. Change a token in both, in the same PR.

## Three principles — every rule traces to one

1. **Unhurried.** Space, one idea per section, slow arrivals, no urgency (no countdowns, no "only 2 left").
2. **Real.** Photos untouched, the UI neutral so the photos carry the colour. No illustrations in place of photos.
3. **Specific.** Facts over adjectives; every word, icon and animation has one job you can name.

When a case isn't covered, pick the option that keeps all three.

## Topic files — load the one the task needs

| File | Load when |
|---|---|
| `colour.md` | choosing any background, text colour or line |
| `photos.md` | choosing or placing a photo (with the `image-brief` skill for briefs and alt text) |
| `icons.md` | adding an icon, or drawing a new one |
| `motion.md` | anything that moves, scrolls, opens or reveals |
| `components.md` | building a section: what exists and when to use it |

Type and copy: type rules below; words follow the `travedise-voice` skill.

## Layer rule (the one that matters most)

Components use the semantic tokens in `global.css` (`--paper`, `--ink`, `--bark`, `--clay`,
`--wash`, …). Never a raw hex, never `rgba()` of a brand colour, never a new colour without a
token. A new token means a change to `global.css`, `docs/design.html` and `colour.md` together.

## Type

- Headings: `var(--display)` (Newsreader Light, standing in for Nocturne Serif), weight 300
  (`--w-head`). Never bold a serif heading.
- Everything else: `var(--sans)` (Schibsted Grotesk) 400 for reading, 500 for labels and buttons,
  600 only for 12–13px uppercase labels with `.06em` tracking.
- Sizes are the `--fs-*` tokens (`display`, `hero`, `h1`–`h4`, `lede`, `body` 18, `small` 15,
  `cap` 13, `ui` 15). They already scale with the window: never add your own responsive font size.
  Nothing below 13px.
- **One italic phrase per heading, at the end**: `Tour <em>packages.</em>`. Never two, never
  italic for emphasis in body copy.
- `text-wrap: balance` on headings, `pretty` on paragraphs; body lines stop at `64ch`.
- Prices, days and times in lists: `font-variant-numeric: tabular-nums`.
- Sentence case everywhere, buttons and navigation included.

## Layout

- Desktop is designed at 1440: gutter 72 (`--gut`), content 1296, 12 columns with 32 gaps.
  Phones use a 16 gutter. Breakpoints are where the content breaks (see `global.css`), not device names.
- Separate sections with space or a `--mist` background, not a line. Lines are allowed only where
  `colour.md` lists them.
- Radii: cards and photos 18, panels 16, fields 12, pills 999.

## Before you finish

- [ ] No raw colour values; only tokens
- [ ] At most one italic phrase per heading
- [ ] Photos from one family or one warmth side (`photos.md`)
- [ ] Icons from `src/assets/icons/` only, with labels (`icons.md`)
- [ ] Motion only from `motion.md`, with reduced-motion handled
- [ ] Words checked against `travedise-voice`
