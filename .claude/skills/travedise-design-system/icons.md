# Icons

Two sets, both drawn for Travedise, both in ink. The drawings live in one file,
`scripts/icons.mjs`; `pnpm icons` writes `src/assets/icons/ui/*.svg` and
`src/assets/icons/spot/*.svg`. Edit the script, never the SVG files. Use them through
`<Icon name="…" />` (UI) and `<Icon spot name="…" />` (spot) from `src/components/Icon.astro`.
The sheet is in `docs/design.html#icons`; the Figma components are on page "Standard · Nov 2026".

## Which set

```
Is it beside a word, helping someone act (a button, a link, a fact in a meta line)?
 └── Yes → UI icon, 20 or 24px
Is it introducing an idea at the top of a card or step (like a chapter mark)?
 └── Yes → spot icon on a --wash tile at least 2.5× its size, one per card
Anything else → no icon. Use words.
```

## UI icons — exist: nothing else does

`arrow-right` `arrow-left` `arrow-up-right` `chevron-down` `plus` `minus` `close` `menu` `check`
`search` `phone` `chat` `mail` `pin` `calendar` `clock` `people` `car` `plane` `sun` `info` `play`

- **Chevron means "opens here", arrow means "goes there".** Accordions and dropdowns:
  `chevron-down` (rotated 180° when open). Navigation: `arrow-right`. Leaving the site: `arrow-up-right`.
- Icon-only buttons are allowed only for `close`, `menu`, `play` and carousel arrows, each with an
  `aria-label` naming the action ("Close menu"). Every other icon has a visible label.
- 8px between icon and label (6px beside 13–15px text). Icon buttons are 44 × 44.

## Spot icons — exist: nothing else does

`compass` (local knowledge) `coast` `hills` `wildlife` `culture` `route` (tailor-made) `support`
`rings` (weddings) `group` `vehicle` `season` (when to go)

Shown between 56 and 96px. Below 56 use a UI icon instead.

## Drawing a new icon

UI: 24 grid, drawing inside 20 (2px padding), `stroke-width 1.5`, round caps and joins, no fills,
points on whole or half pixels, dots are `r 0.9` circles. A 16px version is redrawn at
`stroke-width 1.25`, never scaled down.

Spot: 72 grid, drawing inside about 56, `stroke-width 1.25`, geometric (circles, arcs, straight
lines), paths left open where the eye can close them, one dot of detail at most, dotted lines
(`stroke-dasharray="0.01 4"`) for routes and rows. No faces, no flags, no religious symbols beyond
architecture, no place clichés (no elephant silhouette for "Sri Lanka").

Add the drawing to `scripts/icons.mjs`, run `pnpm icons`, add it to the lists here and in
`docs/design.html`, and add the Figma component. Never use Lucide, Phosphor, Heroicons or emoji,
even for one missing icon.

```astro
<!-- Correct -->
<a class="btn ink" href="/plan-your-trip">Plan your trip <Icon name="arrow-right" /></a>
<button aria-label="Close menu"><Icon name="close" /></button>

<!-- Incorrect: icon replaces the word; chevron used for navigation -->
<a href="/packages"><Icon name="chevron-down" /></a>
```
