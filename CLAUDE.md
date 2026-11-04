@AGENTS.md

# travedise.com

Static Astro site on Cloudflare Pages: https://travedise.com. More background in `README.md`.

## Git — Claude does it, the person doesn't have to

Not everyone working here knows git. Handle it for them without asking them to run commands:

1. **Start of every session:** `git fetch`, switch to `dev`, `git pull` — work always starts from the latest `dev`.
   If there are uncommitted changes, ask before switching.
2. **Before editing:** create a branch off `dev` named for the change (`feature/…`, `fix/…`, `docs/…`).
3. **When the change is done:** `pnpm build` and `pnpm test` must pass locally — nothing runs
   them on the PR — then commit, push, and open a PR with
   `gh pr create --base dev` (GitHub defaults to `main` — always pass `--base dev`).
   Write the PR description in plain language: what changed and where to look.
4. **Tell the person** the PR link and that the owner will review it. Then check out `dev` again.

Never commit or push to `main` or `dev` directly — GitHub blocks direct pushes to both for everyone,
the owner included, so every change goes through a PR. Releases (`dev` → `main`) are done only by the owner.

## Merging — only for the owner

GitHub no longer requires an approving review on `dev` or `main`, so anyone with write access
*could* merge. The rule here is that only the owner does. When the owner asks to merge a PR,
Claude merges it for them:

1. Confirm it's the owner: `gh api user --jq .login` must print `iroshandezilva`. If it prints
   anything else, don't merge — say the owner has to review and merge it.
2. CI no longer builds pull requests, so there is no check to read. Confirm instead that
   `pnpm build` and `pnpm test` pass on the PR branch locally; if either fails, say so and stop.
3. `gh pr merge <n> --admin --squash --delete-branch` (for a `dev` → `main` release PR use `--merge`
   and keep the branch; for the `cms` → `dev` PR from the content editor, leave out `--delete-branch` —
   `cms` must never be deleted, see `docs/cms.md`). `--admin` is still needed for `main`, whose `build`
   check only runs after a push and so never reports on the PR; the owner may use it only when merging
   a PR — not for direct pushes. Share what was merged and where it deploys.

Never merge on your own initiative or for anyone else.

## Where changes show up

- `dev` → preview at https://dev.travedise.pages.dev (updates a minute after a PR merges into `dev`)
- `main` → live site https://travedise.com
- Deploys run from `.github/workflows/deploy.yml`. Don't deploy manually and don't change Cloudflare DNS.

## Build constraints

- `output: "static"` — the site is fully static. No on-demand rendering, no server adapter,
  no `Astro.request` headers/cookies, and dynamic routes must list their pages in `getStaticPaths`.
- Server code lives only in `functions/` (Cloudflare Pages Functions): the enquiry form
  (`functions/api/enquiry.js`, sends through Zoho Mail) and the Markdown middleware.
- Words and photos live in `src/content/**` as JSON, so they can be changed without touching components
  (and by the CMS, once it is added) — don't hardcode copy in components.
- Preview a production build with `pnpm build && pnpm preview`.

## Sub-agents and skills

Project agents are in `.claude/agents/`, their skills in `.claude/skills/`. The usual flow:

```
web-designer (canvas, until the owner approves) → design-porter → build-verifier → astro-reviewer → pr-shipper
content-writer (src/content JSON, SEO, shot lists) ─────────────┘
```

Also: `motion-polisher`, `agent-readiness-checker`, `infra-guard` (workflows, Cloudflare,
Functions — asks first), `cms-keeper` (Stacki Studio). The design reference is `docs/design.html`;
open it in a browser.
