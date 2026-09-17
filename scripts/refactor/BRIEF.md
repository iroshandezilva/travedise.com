# Tailwind refactor — agent brief

We're replacing the Webflow port (Webflow CSS classes + IX2/jQuery/GSAP runtime) with
Tailwind v4 and React components. **The result must look and behave like the current site**,
which is served as the reference at http://localhost:4100 (a build of `dev` before the refactor).
Delete nothing Webflow-related yet; cleanup is a separate final step.

## Ground rules

- **Styling: Tailwind utilities only.** No new CSS files, no CSS modules, no inline `style` except
  CSS variables or truly dynamic values. Arbitrary values (`w-[1271px]`) are fine when no token fits.
- **Desktop-first**, mirroring Webflow: bare classes = desktop, then `max-lg:` (≤991px),
  `max-md:` (≤767px), `max-sm:` (≤479px). Also available: `xl:` ≥1280, `2xl:` ≥1440, `3xl:` ≥1920.
- **Tokens** (see `app/globals.css`): colors `navy navy-800 ink slate slate-400 slate-300 lime surface
  surface-2 surface-3 line line-strong white black`; fonts `font-sans` (General Sans, body),
  `font-heading` (Inter Tight), `font-serif` (Georgia), `font-boska`; sizes `text-h1…text-h6`
  (responsive by themselves), `text-body-lg`; radii `rounded-card` (20px) `rounded-panel` (25px);
  easings `ease-out-quart ease-out-quint ease-in-out-quart`; `container-site` = Webflow `.container`
  (max-w 1271px, px 15px, centered); `animate-marquee` (set `--marquee-duration`).
  Base styles already match Webflow for `body`, `h1–h6` (font, color, size, weight), `img`.
- **Reuse the foundation — don't edit these files** (report needed changes instead):
  `app/globals.css`, `app/layout.tsx`, `app/fonts.ts`, `lib/cn.ts`, `components/ui/*`.
  - `ArrowButton` (`variant="light" | "glass"`) — Webflow `.button-01` / `.button-01.transparent`
  - `PillButton` (`variant="navy" | "white"`) — `.button-03`
  - `OutlinePill` — `.button-outline` (rolls label on parent `group` hover)
  - `TextRoll` — the rolling label used by all of the above
  - `SectionTag` (`tone="navy" | "white"`) — `.subtitle-block`
  - `Reveal` — scroll-into-view fade/slide (`from="bottom" | "left" | "fade"`, `delay` ms, `as` tag).
    Every IX2 `SCROLL_INTO_VIEW preset:slideInBottom/slideInLeft` becomes `<Reveal>` with the same delay.
  - `cn()` — class joining with Tailwind conflict resolution.
- **Components:** typed props, content passed in as props/data arrays rather than copy-pasted JSX.
  Server components by default; add `"use client"` only for interactivity (menus, accordions, scroll
  listeners). Use `next/link` for internal links, `<img>` for images (the site is a static export;
  keep the same `/assets/...` files, `loading="lazy"` below the fold, meaningful `alt`).
- **Animations:** CSS transitions/keyframes via Tailwind first (`group-hover:`, `transition-*`,
  `duration-*`, `ease-*`, `data-[state=open]:`). `motion` (motion.dev, `motion/react`) is installed for
  things CSS can't do well (height auto, presence/exit, scroll-linked values) — use sparingly.
  No GSAP, jQuery, Lottie or Webflow runtime. Lottie icons (hamburger, plus/minus) become CSS/SVG.
  Respect `prefers-reduced-motion` for anything bigger than a hover (`motion-safe:` / `motion-reduce:`).
- **Accessibility:** buttons are `<button>`, links are `<a>`/`Link`; menus/accordions get
  `aria-expanded`/`aria-controls`; keep heading levels as on the reference page.
- Remove Webflow leftovers from anything you migrate: `data-w-id`, `w-*` classes, `data-wf-*`,
  `style={{opacity: 0}}` placeholders, `WebflowScripts`.

## Shared site components (wave 1 — reuse, don't re-implement)

| Component | Use |
|---|---|
| `components/site/navbar.tsx` `<Navbar variant? current? fillOnScroll? hideOnScroll?>` | `/`: `variant="transparent" current="/" hideOnScroll={false}` · `/about`: `variant="transparent" current="/about"` · `/blog-posts/*`: `variant="transparent"` · `/blog` `/contact` `/packages`: `current="/blog"` etc. · `/faq`: no props · `/packages/<detail>`: `fillOnScroll={false} hideOnScroll={false}` |
| `components/site/footer.tsx` `<Footer />` | every page, no props |
| `components/site/page-gradient.tsx` `<PageGradient />` | first thing inside the page wrapper on `/blog` `/contact` `/faq` `/packages` and package detail pages (its wrapper must not be `relative`) |
| `components/site/blog-post-share-bar.tsx` `<BlogPostShareBar />` | replaces `.back-details-block` on the three blog posts |
| `components/site/faq-section.tsx` `<FaqSection items variant? cta? defaultOpen?>` | `/`, `/packages`, package details: `items={siteFaqs}` · `/faq`: `items={faqPageFaqs} variant="page"` (replaces `section.accommodations-section`) |
| `components/site/faq-accordion.tsx` `AccordionItem`, `FaqAccordion`, `PlusMinusIcon` | any other accordion (e.g. package itinerary `.faq-list-wrap.gallery`: `AccordionItem` with custom header, `reveal={{ from: "left" }}`) |
| `components/site/package-card.tsx` `PackageCard`, `<PackageCardGrid packages layout="home"｜"listing" reveal?>` | `/`: `packagesFor("home")`, `layout="home"` · `/packages` tabs: `packagesFor("packagesPage", tab.category)`, `layout="listing"`, `reveal={false}` for non-All tabs |
| `components/site/blog-card.tsx` `BlogCard`, `<BlogCardGrid posts variant="section"｜"listing">` · `blog-section.tsx` `<BlogSection />` | `/` and `/about`: `<BlogSection />` · `/blog`: `<BlogCardGrid posts={blogPosts} variant="listing" />` |
| `content/packages.ts` (`packages`, `packageListings`, `packageTabs`, `packagesFor`) · `content/blog.ts` (`blogPosts`) · `content/faqs.ts` | data — extend with new fields if your pages need them, don't duplicate |

Look at `app/preview/*` for usage. The reserve-now popup (`div.reserve-now-popup`) is dead on the
reference (nothing opens it) — **delete that markup**, don't rebuild it.

Deliberate difference: FAQ items 5–9 on `/packages` and package detail pages never worked on the
reference (Webflow bug); the new FAQ works for all items, so those sections are shorter. Expected.

## Known gotchas

- The Webflow stylesheet still loads (in a layer above Tailwind's preflight, below utilities) until
  cleanup, so its **element** rules leak into migrated markup: `label { margin-bottom:5px; font-weight:bold; display:block }`,
  `input { line-height: normal }`, `ul, ol { padding-left:40px; margin-bottom:10px }`, `blockquote`, `figure`,
  `a { text-decoration: underline }`, `p`… Set these explicitly on your elements (`mb-0`, `leading-6`,
  `pl-0 list-none`, `no-underline`) so they render the same after the stylesheet is removed.
- `app/globals.css` has `@source not "./<route>/page.tsx"` lines — **delete the lines for the pages you
  migrate** (that's the one allowed edit to globals.css), otherwise Tailwind won't generate your classes.
- Tailwind's default transition easing is `cubic-bezier(.4,0,.2,1)`; Webflow CSS `transition: all .25s`
  uses `ease` → write `ease-[ease]`. IX2 timelines with blank easing are linear.
- `cn()` knows the custom tokens (`text-h1…h6`, `text-body-lg`, `rounded-card/panel`).
- Page files become server components: drop `WebflowScripts`/`WEBFLOW_SCRIPTS`, keep `metadata` as is.

## Tools (run from the repo root)

```bash
# Animation catalog for a page: every data-w-id, its trigger and timeline.
node scripts/refactor/ix2.mjs app/faq/page.tsx

# Computed styles of a reference element subtree across breakpoints — translate these to utilities.
node scripts/refactor/styles.mjs --route /faq --sel "section.footer" --widths 1440,991,767,479 [--depth 4]

# Visual diff: reference vs your build. Writes side-by-side slices (reference LEFT, yours RIGHT).
node scripts/refactor/shots.mjs --route /faq --cand http://localhost:<your-port> --out <dir> \
  [--cand-route /preview/footer] [--sel "section.footer"] [--cand-sel "footer"] [--hover] \
  [--widths 1440,991,767,390]
```

Open the slice PNGs with the Read tool and compare. Mismatch % is a hint, not the goal: moving
marquees/sliders and sub-pixel text produce noise. Check every width, and hover states for
interactive elements. Aim for "can't tell them apart" at 1440, 991, 767 and 390.

## Your build

Work in your own git worktree. Once: `pnpm install`. Then iterate:

```bash
pnpm build && npx -y serve out -l <your-port> --no-clipboard   # run serve in the background once;
                                                               # rebuilds replace out/ in place
```

(`serve` keeps serving the new `out/` after a rebuild; restart it if a page 404s.)
`pnpm build` also type-checks. Format touched files with `pnpm exec prettier --write <files>`.

## Finishing

1. `pnpm build` passes, prettier run, visual check done at all widths.
2. Commit on your worktree branch with a clear message (no pushing, no PRs).
3. Final report: files added/changed, the component APIs (props), remaining visual differences
   you couldn't close and why, and any foundation changes you'd like.
