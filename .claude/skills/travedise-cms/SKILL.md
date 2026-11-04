---
name: travedise-cms
description: Working with the Stacki Studio content editor in studio/ — running it, how Publish reaches the site through the cms branch, the rules that keep the cms branch safe, and which schema changes break the editor. Load before touching content JSON, src/content.config.ts, studio/, the cms branch or its PR.
---

# The content editor (Stacki Studio)

Full docs: `docs/cms.md`. Upstream rules for code inside `studio/`: `studio/AGENTS.md` (its
TypeScript and testing rules apply there, not to the site).

## Run it

```bash
pnpm studio:install   # once
pnpm studio           # http://localhost:4350/studio
pnpm studio:stop
```

It edits a draft copy in `studio/.studio/workspace/` (ignored by Git). To throw a draft away:
stop the editor, delete `studio/.studio/`. Start from an up-to-date `dev`: the editor publishes
on top of the checkout's current commit.

## How Publish reaches the site

```
editor ─Publish─▶ cms branch ─(cms.yml opens PR)─▶ "Content updates from the CMS" PR into dev ─owner merges─▶ dev ─release─▶ main
```

Publish builds the draft first; a draft that fails the schema is never published. After anything
merges into `dev`, `.github/workflows/cms.yml` merges `dev` back into `cms`.

## The `cms` branch — never break it

- Never delete, reset, rebase or force-push `cms`. Publish refuses to run on rewritten history.
- Merge its PR with `gh pr merge <n> --admin --squash` — **no** `--delete-branch`.
- Don't protect `cms`; the GitHub App pushes to it.
- `tests/cms.test.mjs` fails if `EDITOR_ACCESS` in `studio/cloudflare/wrangler.jsonc` stops being
  `"repository"` or the branch setting changes. Never set `EDITOR_ACCESS` to `"github"` — that lets
  anyone with a GitHub account edit the site.

## CMS or PR?

| Change | Route |
|---|---|
| Words or photos in an existing entry, by an editor | The editor → `cms` |
| New entries written by an agent, many files at once | A normal branch → PR into `dev` |
| Schema, components, layout, code | Always a normal PR |

Before an agent writes content JSON on a branch, check for an open CMS PR:
`gh pr list --base dev --head cms --state open`. If one is open and touches the same files, say
so and ask whether to wait for it to merge — two PRs editing one JSON file will conflict.

## Schema changes the editor must survive

The editor builds its forms from `src/content.config.ts`.

- No `z.tuple(...)` — it crashed the Places view. Use `z.array(x).length(n)`.
- Add new fields as `.optional()` so every existing entry stays valid.
- After a schema change, run the editor, open the changed collection and one entry, and check
  the form still loads. Say in the PR that you checked it (or that you couldn't).
- Paths with `[` `]` (dynamic routes) only work because of a patch in
  `studio/src/shared/validation.ts` — keep it when upgrading.

## Local patches to upstream (keep them on upgrade)

- `studio/src/shared/validation.ts` — allow `[` and `]` in paths.
- `studio/src/features/project/projectServer.ts` — site name from `STUDIO_SITE_NAME`.
- `studio/cloudflare/wrangler.jsonc` — our repository, `cms` branch, `repository` access.

Stacki's own suite: `npm --prefix studio test` — 207 of 210 pass; the 3 failures read Stacki's
demo components and are expected.

## Not done yet — owner decisions

The GitHub App, hosting on Cloudflare (Workers Paid, Container, R2, a route for
`travedise.com/studio*`), the switch from `npm ci` to pnpm in `studio/Dockerfile`,
`scripts/dependencies.ts` and `scripts/siteCache.ts`, and a `/__studio-deployment` Pages Function.
Don't start any of them without the owner's go-ahead, and never create Cloudflare resources or
change DNS yourself.
