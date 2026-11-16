# Components

Shared components are in `src/components/`; shared classes are in `src/styles/global.css` (one
stylesheet, grouped by section with comments). Check here before writing new markup. Page-only
parts live in their page. Write a new shared component only when a pattern appears on two pages.

| Component | Use it for | Use instead |
|---|---|---|
| `Header` (`section` prop) | Every page, once | — |
| `Footer` | Every page, once | — |
| `PageHero` (`photo`, `title`, `lede`, `short`) | A page that opens on a full-bleed photo | `PageHead` when there is no strong photo |
| `PageHead` (`title`, `lede`) | A page that opens on paper (lists, legal, utility) | `PageHero` |
| `SecHead` (`title`, `level`) | The heading at the top of a section, with an optional side note or link | A bare `<h2>` only inside prose |
| `Frame` (`photo`, `pos`, `eager`) | Any photo that isn't full-bleed. Placeholder when no photo | `Frame bg` for the full-bleed layer of heroes and bands |
| `Band` (`photo`, `title`, `text`) | A full-bleed photo band between sections. Never two touching | `CloseBand` at the foot of a page |
| `CloseBand` (`photo`, `title`, `cta`, `href`) | The closing call to action, last before the footer | — |
| `TourCard` (`tour`) | A tour in any grid or rail | `NoteCard` for travel notes |
| `NoteCard` (`note`) | A travel note in a grid | — |
| `Faq` (`title`, `items`) | Questions and answers; native `<details>` | `Steps` when order matters |
| `Steps` (`items`) | A real sequence where the numbers mean something | `.cols3` when the order doesn't matter |
| `Icon` (`name`, `spot`) | Any icon (see `icons.md`) | Words, when the icon would replace them |
| `Wordmark` | The logo, in the current text colour | Never an image of the logo |

Props in brackets are the ones that change appearance; read the component's `Props` for the rest.
`title` props that say "may contain `<em>`" carry the one italic phrase at the end of a heading.

## Classes worth knowing

- Buttons: `.btn` + one of `ink` (the primary action, one per view), `light` (primary on a photo),
  `ghost` (secondary on a photo), `line` (secondary on paper); `.big` for heroes. Text link: `.lnk`.
  Arrow inside a button: `<Icon name="arrow-right" />` (or the existing `.ar`).
- Grids: `.cardgrid` (with `--n` columns), `.cols3`, `.steps4`, `.facts`, `.rows`.
  These unfold on scroll automatically (`motion.md`).
- Text: `.lede`, `.small`, `.cap`, `.micro`, `.prose`. Add `.on-photo` to captions over photos.
- Tags `.tag`, chips `.chip`, fields `.fld`.

```
Which button?
 ├── The one most important action in view → .btn.ink (on a photo: .btn.light)
 ├── A second action beside it → .btn.line (on a photo: .btn.ghost)
 └── Anything else → .lnk
```

## Known gaps in the code (fix when you touch them)

- Many lists still draw 1px dividers (`.rows`, `.fest`, `.dish`, `.wild`, `.also`, `.every`,
  the sitemap tree). The standard keeps lines only on fields, accordions and sticky edges
  (`colour.md`); remove the others when you port a page from Figma.
- `.tag` is outlined in code but a filled `--wash` pill in Figma. Follow Figma.
