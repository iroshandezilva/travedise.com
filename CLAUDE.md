@AGENTS.md

# travedise.com

Static Next.js site on Cloudflare Pages: https://travedise.com. More background in `README.md`.

## Git — Claude does it, the person doesn't have to

Not everyone working here knows git. Handle it for them without asking them to run commands:

1. **Start of every session:** `git fetch`, switch to `dev`, `git pull` — work always starts from the latest `dev`.
   If there are uncommitted changes, ask before switching.
2. **Before editing:** create a branch off `dev` named for the change (`feature/…`, `fix/…`, `docs/…`).
3. **When the change is done:** `pnpm build` must pass, then commit, push, and open a PR with
   `gh pr create --base dev` (GitHub defaults to `main` — always pass `--base dev`).
   Write the PR description in plain language: what changed and where to look.
4. **Tell the person** the PR link and that the owner will review it. Then check out `dev` again.

Never commit or push to `main` or `dev` directly. Releases (`dev` → `main`) are done only by the owner.

## Merging — only for the owner

PRs need the owner's approval, and GitHub doesn't let anyone approve their own PR. So when the
owner asks to merge a PR, Claude merges it for them:

1. Confirm it's the owner: `gh api user --jq .login` must print `iroshandezilva`. If it prints
   anything else, don't merge — say the owner has to review and merge it.
2. Check the PR's `build` check passed (`gh pr checks <n>`); if it failed, say so and stop.
3. `gh pr merge <n> --admin --squash --delete-branch` (for a `dev` → `main` release PR use `--merge`
   and keep the branch). Share what was merged and where it deploys.

Never merge on your own initiative or for anyone else.

## Where changes show up

- `dev` → preview at https://dev.travedise.pages.dev (updates a minute after a PR merges into `dev`)
- `main` → live site https://travedise.com
- Deploys run from `.github/workflows/deploy.yml`. Don't deploy manually and don't change Cloudflare DNS.

## Build constraints

- `output: "export"` — the site is fully static. No route handlers reading the request,
  middleware/proxy, server actions, `cookies()`/`headers()`, or dynamic routes without `generateStaticParams`.
- Preview a production build with `pnpm build && npx serve out` (`pnpm start` doesn't work with a static export).
- Forms have no backend yet.
