# Editing with Stacki (Mac app)

[Stacki](https://stacki.build) is a visual editor for Astro sites. It is a Mac app you install
from stacki.build, not code in this repository. It opens this folder, shows the pages, and edits
the words and photos in `src/content/**`. Layout and code changes still go through the normal
branch → PR flow in `CLAUDE.md`.

Upstream: <https://github.com/flowtricks/stacki> · docs: <https://stacki.build/docs/>

## First-time setup (once per computer)

1. Install **Node 22.12 or newer** (Astro 7 needs it; Stacki itself only asks for 18+).
   `node -v` should print `v22.12` or higher.
2. Clone the repo and install with **pnpm** (the project's package manager):

   ```bash
   git clone https://github.com/iroshandezilva/travedise.com.git
   cd travedise.com
   pnpm install
   pnpm dev          # must start at http://localhost:4321 — if it does, Stacki can open it
   ```

3. Open the **repository folder** in Stacki (File → Open). Not `src/`, not a copy.

Stacki's own rule: "If `npm run dev` works in your terminal, the project opens." It installs
dependencies only for projects it scaffolds, never for a cloned one, so step 2 is on you.

## Editing words

Text lives in one of two places, and Stacki treats them differently:

- **One-off text on a page** (headings, intro paragraphs, button labels) is written directly in
  the page. Click it on the canvas and type.
- **Repeating or shared text** comes from data, and Stacki shows it as a purple chip such as
  `regions` or `homeQuestions`. The Content field swaps the binding; it does not type over the
  value. Change it in the **Collections** panel (⌥C): `pages` → `home` / `about`, or `places`,
  `packages`, `blog`, `site`. You can also edit the JSON in `src/content/**` in any editor.

What goes where, and why, is the "Where text lives" table in the `astro7-site` skill: one-off
text is hardcoded; lists, text used in more than one place (like the home hero paragraph, which
is also the page's meta description), collections and photo paths are data. If you type copy into
a component that is also used elsewhere, the other copy will not change; ask Claude to move it
into data.

Classes, tags and styles on an element are real attributes in the `.astro` file, so those edit
directly on the canvas.

## Getting edits live

Stacki writes to the files in your checkout. It does not deploy this site, and nothing reaches
travedise.com until the change is in a PR into `dev`. Ask Claude to ship it (branch, commit, PR),
following `CLAUDE.md`.

- **Do not use Stacki's Publish button.** It stores a hosting target in `.stacki/publish.json`
  (git-ignored). This site deploys from `.github/workflows/deploy.yml` to Cloudflare Pages only.
- Stacki may reformat a file it touches (for example `<slot />` → `<slot></slot>`). Look at the
  diff and drop whitespace-only changes.

## If it breaks

| What you see | Fix |
|---|---|
| "The content config could not be read — needs the project dependencies installed" | Run `pnpm install` in the repo folder, check `pnpm dev` starts in a terminal, then press **Try again** in Stacki. |
| Preview never turns green | `pnpm dev` in a terminal. If Astro fails there, the problem is the project, not Stacki. Check `node -v` is 22.12+ and that port 4321 is free. |
| `package-lock.json` appears | Something ran `npm install`. Delete it (it is git-ignored) and use `pnpm install`; the lockfile here is `pnpm-lock.yaml`. |
| A collection will not open | Check `src/content.config.ts` for `z.tuple(...)`. Stacki cannot show tuples; use `z.array(x).length(n)`. `pnpm test` guards this. |

## Rules that keep Stacki working

- `package.json` keeps `"dev": "astro dev"` and `engines.node` (`pnpm test` checks both).
- Collections are declared in `src/content.config.ts` with `glob()` loaders and `astro/zod`.
- New schema fields are `.optional()` so existing entries stay valid.
- Don't commit `.stacki/` or `package-lock.json`.

Earlier versions of this repo carried a copy of the editor in `studio/` (with a `cms` branch and
a hosted-editor setup that was never switched on). It was removed in favour of the Mac app. To
look at it: `git switch -c restore-studio studio-final`.
