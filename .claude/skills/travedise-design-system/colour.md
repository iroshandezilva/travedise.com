# Colour

One warm hue (OKLCH hue 75) from paper to ink. No brand accent: hierarchy comes from ink, colour
comes from photographs. Tokens live in `src/styles/global.css`; the swatches are in
`docs/design.html#colour`.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--paper` | #FCFBF8 | 0.988 0.0035 75 | Page background. Every page |
| `--mist` | #F7F4F0 | 0.968 0.006 75 | Alternate section, to separate sections without a line |
| `--wash` | #EFEAE4 | 0.94 0.0095 75 | Panels, tags, icon tiles, photo placeholders |
| `--sand` | #E5DFD6 | 0.905 0.014 75 | Pressed and selected fills on light |
| `--stone` | #D0C7BC | 0.835 0.019 75 | The few allowed hairlines; secondary text on ink |
| `--dune` | #8E8578 | 0.62 0.021 75 | Form field and outline-chip borders (3.5:1) |
| `--clay` | #6F665A | 0.515 0.022 75 | Captions, meta, labels (5.4:1) |
| `--bark` | #4F4639 | 0.40 0.024 75 | Paragraphs and descriptions (8.9:1) |
| `--umber` | #30271A | 0.28 0.026 75 | Panels inside a dark band |
| `--ink` | #1C1204 | 0.19 0.03 75 | Headings, links, primary buttons, dark band (17.9:1) |
| `--error` | #A04130 | 0.5 0.13 32 | Field errors only, always with an icon and a sentence |
| `--ok` | #3D7149 | 0.5 0.085 150 | Sent and saved confirmations only |

Text on photos is `#fff` with the standard scrim. Nothing else uses pure white.

## Which background

```
The page → --paper
A section that must read as separate, with no line → --mist
A panel, tag, icon tile or photo placeholder → --wash
The one closing band or CTA card on a page → --ink (panels inside it: --umber)
```

At most one `--ink` band per page, and never two dark sections touching: ink stays near 5% of a
screen (the rest is roughly 80% paper/mist/wash and 15% photographs).

## Which text colour

```
Headings, buttons, links, anything clickable → --ink
Paragraphs and descriptions → --bark
Captions, meta, labels, field help → --clay (never below 13px)
On --ink → --paper, then --stone, then --dune
On --wash → --ink / --bark; --clay only at 15px and up (4.7:1)
```

Never make a lighter text colour with `opacity` — use the next token.

## Lines

```
Form field, select, outline chip → 1px --dune (WCAG needs 3:1 for field edges)
Accordion divider (FAQ, itinerary day), solid header edge, sticky sub-nav edge,
the selected tab's underline → 1px --stone
Anything else → no line. Use space, --mist or --wash.
```

## Never

- An accent colour, a gradient for decoration, orange or yellow (the owner rejected them).
- Tinting, filtering or colour-grading a photo to match the page. Choose another photo.
- `rgba()` of a brand colour in a component. Ask for a token.
