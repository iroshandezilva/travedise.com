@AGENTS.md

# travedise.com

Static Next.js port of the old Webflow site, hosted on Cloudflare Pages at
https://travedise.com. See `README.md` for how the Webflow runtime is wired in.

## Git workflow — never commit to `main` or `dev` directly

```
feature branch ──PR──▶ dev ──PR──▶ main ──auto-deploy──▶ travedise.com
```

1. Branch off an up-to-date `dev`: `git checkout dev && git pull && git checkout -b <type>/<short-name>`
   (`feature/…`, `fix/…`, `docs/…`, `chore/…`).
2. Push and open the PR against **`dev`**: `gh pr create --base dev` (GitHub defaults to `main`).
3. Releases are a PR from `dev` into `main`. Only open one when asked.
4. Don't merge PRs, use `--admin`, or bypass the rulesets unless the owner asks in that session.

Repo rules (GitHub rulesets): `main` needs a PR, owner approval (CODEOWNERS) and a
passing `build` check; no force-push or deletion. `dev` needs owner approval on PRs.

## Deploys

- Merging to `main` runs `.github/workflows/deploy.yml`: `pnpm build` → `wrangler pages deploy out`
  to the Cloudflare Pages project `travedise`. PRs only run the build.
- Never deploy manually with wrangler unless asked — `main` is the source of truth.
- DNS, redirect rules and the Pages project live in Cloudflare (zone `travedise.com`).
  Don't change DNS without explicit approval; MX/SPF/DKIM/Zoho records carry the domain's email.

## Build constraints

- `next.config.ts` uses `output: "export"` — the site must stay fully static.
  No route handlers that read the request, no middleware/proxy, no server actions,
  no `cookies()`/`headers()`, no dynamic routes without `generateStaticParams`.
- `pnpm start` doesn't work with a static export. To preview a build: `pnpm build && npx serve out`.
- Run `pnpm build` before pushing; it also type-checks. Format with `pnpm exec prettier --write`.

## Editing pages

- `app/**/page.tsx` is hand-maintained. Don't re-run `scripts/convert.mjs` — it overwrites edits.
- Keep Webflow class names and `data-w-id` attributes: `public/css` and the IX2 runtime in
  `public/js` target them (animations, tabs, reveals). Elements with inline `opacity: 0`
  are revealed by IX2, not bugs.
- Page titles follow `"<Page> - Travedise - Your Next Adventure Starts Here"` and are set
  in three places per page (`title`, `openGraph.title`, `twitter.title`).
- Forms are Webflow leftovers with no backend yet — don't assume submissions go anywhere.
