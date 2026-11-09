---
name: astro7-site
description: How this site is built on Astro 7 — content collections, data modules, static output, fonts, islands and Pages Functions. Load before writing or reviewing any code in src/, functions/ or astro.config.mjs.
---

# Astro 7 on travedise.com

Astro is pinned to 7.3.x. Older
Astro and Next.js habits break here — this site was Next.js until PR #25, and some leftovers
(`out/`, `.next/`, `next-env.d.ts`) are still lying around untracked. Ignore them.

When an API is not on this page, read `node_modules/astro` (types and `dist/`) or
https://docs.astro.build before writing it. Don't write from memory.

## The build

- `output: "static"`, `build.format: "file"`, `trailingSlash: "never"` (`astro.config.mjs`).
  Every page is an `.html` file at build time: `about.html`, not `about/index.html`. Cloudflare's
  clean URLs, `public/_routes.json` and `tests/build-output.test.mjs` all depend on that.
- `pnpm build` = `astro build` + `node scripts/agent-files.mjs` (Markdown copies, `llms.txt`,
  `.well-known`). `pnpm test` checks `dist/`, so it must run after the build.
- `pnpm check` runs `astro check` (types). Run it after you change a type or a schema.
- `pnpm preview` serves the production build.

**Not allowed** — each one needs a server, and there is none:
on-demand rendering, `export const prerender = false`, adapters, server islands, Actions,
`Astro.request` headers or cookies, and middleware in `src/`. A dynamic route must list every
page in `getStaticPaths`.

Server code lives only in `functions/` (Cloudflare Pages Functions, outside Astro):
`functions/api/enquiry.js` (Zoho Mail) and `functions/_middleware.js` (Markdown for
`Accept: text/markdown`). Both have tests in `tests/`.

## Where text lives (hybrid)

Stacki edits literal text in a `.astro` file directly on the canvas. Text that comes from a
variable (`{team.heading}`) shows as a chip and can only be changed in the data. So pick the home
for each piece of text on purpose:

| Text | Where | Why |
|---|---|---|
| One-off text on one page: headings, intro paragraphs, button labels, notes | **Hardcode in the `.astro` component** | Editable on the canvas; nothing else reads it |
| Items in a list or loop (`.map`): regions, steps, FAQs, reviews, team members, stats | **JSON** | One layout, many entries |
| Text used in more than one place, including the page `<meta description>`, JSON-LD and the hero that repeats it | **JSON**, read in both places | Edit once, stay in sync |
| Collections: places, packages, blog, vehicles, weddings, groups | **JSON** (collection schema) | Many entries, forms, validation |
| Site-wide: contact details, socials, nav and footer labels | **`src/content/site/*.json`** | Used on every page |
| Photo paths and alt text | **JSON / data** | Picked in Stacki's Assets and Collections panels |

Before moving text either way, `pnpm build` and compare the built HTML: a move must change no
words. If a hardcoded string is later needed in a second place, move it into JSON then.

## Content in JSON: schema and data module, always both

The JSON in `src/content/**` is what the table above puts there.

- `src/content.config.ts` declares the `places`, `packages` and `blog` collections with
  `glob()` from `astro/loaders` and `z` from `astro/zod` (not `zod`).
- Pages do **not** call `getCollection`. They import typed modules in `src/data/**`, which read
  the JSON with `import.meta.glob` and add derived fields (`href`, reading time, order).
  Those modules have **hand-written types**.

So a new or renamed field needs **three** edits, or one of the layers is wrong:

1. the schema in `src/content.config.ts` (so the build checks it),
2. the type in `src/data/blog/types.ts`, `src/data/v2/places.ts` or `src/data/v2/packages.ts`,
3. the JSON files and the component that reads the field.

Schema rules that Stacki needs (see the `travedise-cms` skill): no `z.tuple` — use
`z.array(...).length(n)`; prefer optional fields so existing entries stay valid.

Page-level words are `src/content/pages/*.json`; words shared across pages and contact details
are `src/content/site/*.json`. These are plain imports, not collections.

## Pages

- Every page wraps in `src/layouts/base.astro`:
  `<Base title description canonical image ogType publishedTime noindex>`. `canonical` is a
  path (`"/about"`). Live pages then wrap their content in `<div class="v2 …">`.
- Templates: `src/pages/blog-posts/[slug].astro`, `places/[slug].astro`, `packages/[slug].astro`.
  Each reads `entry.seo?.title` / `entry.seo?.description` first and falls back to the
  entry's own title and summary.
- `src/pages/sitemap.xml.ts` lists pages by hand, with the source files that set each page's
  `lastmod`. New places, packages and notes are picked up from their collections; a new
  standalone page must be added to that list.

## Fonts, styles, scripts

- Fonts are declared in `astro.config.mjs` (`fonts: [...]`, Ragmont local, Inter Tight from
  Google) and rendered by `<Font>` from `astro:assets` in the base layout. Don't add
  `<link>` font tags or `@font-face` by hand.
- Styles: Tailwind v4 utilities only. The only CSS file is `src/styles/global.css` (tokens in
  `@theme`, component CSS in `@layer components`). See the `travedise-design-system` skill.
- Tailwind scans every file that isn't excluded. `global.css` excludes `public/`,
  `docs/` and `.claude/` with `@source not`. A new folder full of class-like words (docs,
  fixtures) needs the same, or its words become CSS in the site bundle.
- Interactivity: a plain `<script>` in the component (menus, accordions, filters). React only
  for the two islands in `src/components/islands/` (`trip-form.tsx`, `map-explorer.tsx`).
- Imports use the `@/` alias for `src/`.

## Before you say it works

Run `pnpm build && pnpm test`, and `pnpm check` if you changed types. Paste the failing output if
either fails — don't summarise it as "a small issue".
