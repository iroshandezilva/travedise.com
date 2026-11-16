# Motion: respond fast, arrive slowly

The interface answers at once (press, hover, menus in ≤ 320ms). Content takes its time (unfold
900ms, photos settle 1400ms). Smooth wheel scrolling is Lenis; reveals and scroll-linked drift are
motion.dev (`motion`, vanilla API: `animate`, `inView`, `scroll`, `stagger`). Both live in
`src/scripts/motion.ts`. Demos: `docs/design.html#motion`.

## Tokens — nothing else exists

| CSS (`global.css`) | JS (`motion.ts`) | Use |
|---|---|---|
| `--ease-out` cubic-bezier(.23,1,.32,1) | `EASE_OUT` | Anything arriving or leaving; press |
| `--ease-in-out` cubic-bezier(.77,0,.175,1) | — | Something on screen moving or resizing: header hide, accordion height |
| `--ease-drawer` cubic-bezier(.32,.72,0,1) | `EASE_DRAWER` | The phone menu sheet |
| `ease` | — | Colour and background on hover |
| `--dur-press` 160ms | — | `:active { transform: scale(.97) }` |
| `--dur-hover` 200ms | — | Hover colour, arrow nudge 3px; also every exit |
| `--dur-ui` 320ms | — | Dropdowns, mega menu, accordions, header hide |
| `--dur-sheet` 480ms | `DUR.sheet` | Phone menu open (close 240ms) |
| `--dur-reveal` 900ms | `DUR.reveal` | Unfold; 70ms between items, max 6 staggered |
| `--dur-settle` 1400ms | `DUR.settle` | Photo settle from `scale(1.08)` |

No bounce, no spring overshoot, no loops, nothing that moves on its own (no auto-advancing
slideshow, no autoplay marquee).

## What happens automatically (motion.ts)

```
Unfold  children of .cardgrid .steps4 .cols3 .facts .rows .gds .soon-grid .princ .proof
        .also .every .fest .dish .wild .sec-head — only if below the fold at load
Settle  every .frame photo below the fold at load
Drift   .band > .px, .phero > .px, .close-band > .px and [data-pl] — 1:1 with scroll
Sheet   #mnav through setMenu() in site.ts
Rise    the hero .intro .ln lines, once per page per visit (CSS + site.ts)
```

A new grid class that should unfold: add it to `GROUPS` in `motion.ts`. To opt a block out:
`data-no-reveal`. A filterable list (items with `data-item`) never unfolds.

## Deciding

```
Will people see it tens of times a visit, or is it keyboard-driven?
 └── Yes → no animation (filters, month buttons, tabs by keyboard, focus moves)
Is it something people read to decide (prices, results, form fields)?
 └── Yes → no animation
Is it arriving on screen as the reader scrolls?
 └── Yes → Unfold (blocks) or Settle (photos); one entrance per container
Is it opening from something the user pressed?
 └── Yes → --dur-ui, --ease-out, from the trigger (y -8px); exit 200ms
Is it on screen and changing size or position?
 └── Yes → --ease-in-out, --dur-ui
Otherwise → no animation
```

## Rules

1. Only `transform` and `opacity` (plus measured height for accordions). No blur, no clip-path on
   large photos, no `transition: all`.
2. Start states are set in JS, never in CSS, so the page reads without JavaScript. Nothing above
   the fold at load is hidden.
3. Paired elements share timing: a panel and its dimmed page, a sheet and its rows.
4. Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
5. Scroll through Lenis: `scrollToEl(el)` and `lockScroll(on)` from `motion.ts`, never
   `scrollIntoView({ behavior: "smooth" })` or `body.style.overflow` directly. Elements with their
   own scrollbar get `data-lenis-prevent`.
6. No parallax on text. Drift is for full-bleed photo layers only.
7. Reduced motion: `motion.ts` runs nothing (no Lenis, no reveals, no drift); CSS keeps colour
   changes and drops transforms (see the block at the end of `global.css`).

```ts
// Correct
import { animate } from "motion";
animate(panel, { opacity: [0, 1], transform: ["translateY(-8px)", "translateY(0px)"] }, { duration: 0.32, ease: EASE_OUT });

// Incorrect: wrong package, bounce, a layout property, an invented duration
import { motion } from "framer-motion";
animate(panel, { height: [0, 300] }, { type: "spring", bounce: 0.5, duration: 0.7 });
```
