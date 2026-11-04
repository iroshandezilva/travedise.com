---
name: agent-readiness-checklist
description: Checks that a built page is readable by search engines and AI agents — title and meta, canonical, JSON-LD, heading order, sitemap, the Markdown copy, llms.txt and .well-known. Load after adding or changing a page, before the PR.
---

# Agent and search readiness

What already exists (PRs #3 and #6): `src/lib/structured-data.ts` (site JSON-LD),
`src/pages/sitemap.xml.ts`, `scripts/agent-files.mjs` (a `<route>.md` per page, `llms.txt`,
`.well-known/agent-skills/index.json`), `functions/_middleware.js` (serves the `.md` for
`Accept: text/markdown`), and `public/.well-known/agent-skills/travedise-trip-planning/SKILL.md`
(a skill for **visitors'** agents planning a trip — not for us).

`tests/build-output.test.mjs` already checks much of this. Run it first; then check by hand what it
doesn't cover.

## Run

```bash
pnpm build && pnpm test
```

## For each new or changed route, check in `dist/`

Replace `<route>` with the page path, e.g. `blog-posts/which-coast-and-when`.

| Check | How | Pass |
|---|---|---|
| Title | `grep -o '<title>[^<]*' dist/<route>.html` | Unique, ends " — Travedise", under about 65 characters |
| Meta description | `grep -o 'name="description" content="[^"]*' dist/<route>.html` | Unique, 70–160 characters, not the site default |
| Canonical | `grep -o 'rel="canonical" href="[^"]*'` | `https://travedise.com/<route>`, no `.html`, no trailing slash |
| Open Graph | `og:title`, `og:description`, `og:image` present | Image is a real photo of the page |
| Headings | `grep -oE '<h[1-6]' dist/<route>.html` | Exactly one `h1`; no level skipped |
| JSON-LD | `grep -c 'application/ld+json'` | Site graph present; parses as JSON |
| Sitemap | `grep '<route>' dist/sitemap.xml` | Listed, unless `noindex` |
| Markdown copy | `dist/<route>.md` exists | Has the page's main text, readable, links absolute |
| llms.txt | `grep '<route>' dist/llms.txt` | Listed, unless `noindex` |
| Images | every `<img>` in `<main>` has `alt` | Alt text is real (see the `image-brief` skill) |

Then, for a travel note, consider whether it deserves `Article` JSON-LD with `datePublished` and
`author` — the site doesn't emit it yet. Suggest it; don't add it unasked.

## Report

A table of route × check with pass/fail, the exact failing output for each fail, and nothing
else. Don't fix anything — the agent that built the page does that.
