---
name: travedise-cms
description: Editing travedise.com content with the Stacki Mac app — how it reads the project, what makes the content config unreadable, schema rules that keep Collections forms working, and how its edits reach the site (a normal PR, never Stacki's Publish). Load before touching content JSON, src/content.config.ts, the `dev` script or Node version, or when Stacki shows an error.
---

# Editing content with Stacki (Mac app)

Full guide: `docs/editing-with-stacki.md`. Stacki is an app installed from https://stacki.build, not
code in this repo. Upstream: https://github.com/flowtricks/stacki, docs https://stacki.build/docs/.

## What Stacki needs from this repo

- `npm run dev` / `pnpm dev` starts Astro (`"dev": "astro dev"` in `package.json`). Stacki's rule:
  if the dev script works in a terminal, the project opens.
- Dependencies installed by the person (`pnpm install`). Stacki installs only for projects it
  scaffolds, never a clone. A missing or half-installed `node_modules` gives "The content config
  could not be read — needs the project dependencies installed."
- Node 22.12+ (`engines.node`; Astro 7's floor). Stacki's docs only say 18+, so an old Node on
  its PATH fails confusingly.
- Collections in `src/content.config.ts` (`glob()` loaders, `astro/zod`); JSON data files are
  read and written in their own format.

`tests/content-schema.test.mjs` fails if the `dev` script, `engines.node` or the `z.tuple` rule
breaks. Run `pnpm test`.

## How edits reach the site

```
Stacki edits files in the checkout ─▶ Claude/pr-shipper: branch off dev, commit, PR into dev ─▶ owner merges ─▶ dev ─▶ main
```

- Never use Stacki's Publish: `.stacki/publish.json` (git-ignored) holds a hosting target this
  site does not use. Deploys are only `.github/workflows/deploy.yml`.
- Stacki reformats files it opens (`<slot />` → `<slot></slot>`). Drop whitespace-only diffs.
- Don't commit `.stacki/` or `package-lock.json`; the lockfile is `pnpm-lock.yaml`.

## Stacki or PR?

| Change | Route |
|---|---|
| One-off page text (heading, intro, button label) | Click and type on the Stacki canvas, then a PR |
| Words or photos in a list, collection or shared field | Stacki Collections panel (⌥C) or the JSON, then a PR |
| New entries written by an agent, many files at once | A normal branch → PR into `dev` |
| Schema, components, layout, code | Always a normal PR |

Before an agent edits content JSON, check `gh pr list --base dev --state open` for a PR touching
the same files; two PRs on one JSON file conflict.

## Schema changes Stacki must survive

- No `z.tuple(...)` — it breaks the collection view. Use `z.array(x).length(n)`.
- Add new fields as `.optional()` so every existing entry stays valid.
- Text bound as `{regions}` or `{homeQuestions}` in a component shows as a chip in Stacki and is
  edited in the data (`src/content/pages/*.json`), not in the Content field. One-off text is
  hardcoded on purpose so it is editable on the canvas (see `astro7-site` → "Where text lives").
- After a schema change, open the changed collection and one entry in Stacki and say in the PR
  that the form loaded (or that you couldn't check).

## History

The old vendored editor (`studio/`, the `cms` branch, `cms.yml`, hosted-editor plans) was removed.
Restore for reference with `git switch -c restore-studio studio-final`.
