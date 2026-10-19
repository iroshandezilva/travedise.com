# Content editor (Stacki Studio)

A visual editor for the site's words and photos. It lives in `studio/` (a copy of
[Stacki Studio](https://github.com/flowtricks/stacki-studio) v0.0.1, MIT, with two small patches
listed below). Editors change text and images; layout and code stay in the normal PR workflow.

**Status:** runs locally. Publishing and hosting are set up in config but not switched on yet:
both need a GitHub App and, for hosting, the owner's choice in [Hosting](#hosting-recommendation).

## Run it on your computer

Needs Node 22.19+ and npm (it comes with Node). From the repository root:

```bash
pnpm install
pnpm studio:install
pnpm studio
```

Open <http://localhost:4350/studio>. The server keeps running in the background; stop it with
`pnpm studio:stop`.

The editor works on a **draft copy** in `studio/.studio/workspace/` (ignored by Git), so nothing
you do there touches the real files until you Publish. To throw a draft away and start again
from the current code, stop the editor and delete `studio/.studio/`.

### Editing words and photos

1. Click the **Collections** icon (the stack of discs) in the left rail.
2. Open **Content collections** → **Places**, **Packages** or **Blog**, then pick an entry.
3. Change fields in the form. Saving is automatic; the preview updates within a second or two.

The other folders in that panel (`pages`, `site`) are the page-level words in
`src/content/pages/*.json` and `src/content/site/*.json`.

Photos are paths such as `/assets/…jpg`. To use a new photo, upload it in the **Assets** panel,
then paste its path into the field. (Changing a path to an existing photo is tested;
uploading through the Assets panel is not yet.)

Checked on 2026-10-19: a place summary (`places/arugam-bay.json`) and a package photo
(`packages/best-of-sri-lanka.json`, `shots[0].src`) were edited in the form. Each one wrote a
one-line change to the draft JSON and showed up on the rendered page.

## How Publish reaches the site

```
editor ──Publish──▶ cms branch ──(Action opens PR)──▶ PR into dev ──owner merges──▶ dev preview ──release──▶ main
```

- Publish runs `npm run build` on the draft first. A draft that fails the content schema
  (`src/content.config.ts`) is never published.
- It then commits the changed files to the **`cms`** branch through a GitHub App. It never pushes
  to `main` or `dev`, which are protected.
- [`.github/workflows/cms.yml`](../.github/workflows/cms.yml) opens a **cms → dev** PR on the
  first publish ("Content updates from the CMS"). Later publishes add commits to the same PR.
- After anything merges into `dev`, the same workflow merges `dev` back into `cms`, so the editor
  always builds on the latest site.

**Merging the CMS PR:** squash-merge it as usual, but **don't delete the `cms` branch**. Use
`gh pr merge <n> --admin --squash` without `--delete-branch`. Publish only ever moves `cms`
forward, and refuses to publish if the branch's history was replaced, so never delete,
reset or force-push `cms`. If it does happen, the workflow recreates `cms` from `dev`. Editors
then delete `studio/.studio/` and start a fresh draft.

### One-time setup for Publish (owner)

1. **Repository settings → Actions → General:** turn on "Allow GitHub Actions to create and
   approve pull requests" so the workflow can open the PR. Leave `cms` unprotected.
2. **Create a GitHub App** (Settings → Developer settings → GitHub Apps) with repository
   permissions *Contents: Read and write* and *Metadata: Read*. Webhooks are not needed. Install
   it on this repository only. Keep its private key outside the repository.
3. To publish from a local editor, start it with the App's details in the environment (never in a
   committed file):

   ```bash
   GITHUB_APP_ID=… GITHUB_INSTALLATION_ID=… GITHUB_PRIVATE_KEY="$(cat ~/keys/travedise-cms.pem)" GITHUB_REPOSITORY=iroshandezilva/travedise.com GITHUB_BRANCH=cms pnpm studio
   ```

   Start from an up-to-date `dev` checkout: the editor treats the checkout's current commit as
   the base it publishes on top of.

## Who can edit

`studio/cloudflare/wrangler.jsonc` sets `EDITOR_ACCESS` to `"repository"`. Once the editor is
hosted, only GitHub accounts with **Write** or **Admin** access to this repository can sign in.
Add an editor in GitHub → Settings → Collaborators; removing them there also removes their
editor access within about five minutes. Never set it to `"github"` (Stacki's default), which
lets anyone with a GitHub account edit. `tests/cms.test.mjs` fails the build if that setting
or the `cms` branch changes.

The local editor has no sign-in. It only listens on `127.0.0.1`, so only your own computer can
reach it.

## Hosting recommendation

The local editor costs nothing but needs Node and a checkout, so in practice only the owner or
a developer can use it. Hosting puts it at `travedise.com/studio`, where an invited editor signs
in with GitHub from any browser.

| | Local only | Hosted on Cloudflare |
| --- | --- | --- |
| Cost | $0 | Workers Paid $5/month, plus roughly $0–2 usage with light editing. About $25/month worst case if the editor's container never sleeps (it is set to sleep 3 minutes after the last editor leaves). |
| Who can edit | People who can run `pnpm studio` | Any invited collaborator, in a browser |
| Live collaboration | No | Yes (shared draft, cursors) |
| Setup | Done (this PR) plus the GitHub App | GitHub App, Workers Paid plan, one Container, a Durable Object, a private R2 bucket for drafts, a Worker route for `travedise.com/studio*` and a `preview.travedise.com` subdomain |
| Site hosting | Unchanged | Unchanged: the site stays on Cloudflare Pages; only `/studio` goes to the editor Worker |

**Recommendation: host it once someone other than the owner needs to edit.** The point of the
CMS is letting non-developers change words and photos, and only the hosted version allows that.
At light use the cost is close to the $5 plan fee. Until then, use the local editor and
set up the GitHub App so Publish → cms → PR can be tested end to end for free. Set a Cloudflare
budget alert at $10 when hosting starts. Alerts only notify, they don't cap spending.

**Work still needed before hosting:**
- The editor's container image installs the site with `npm ci` and expects
  `package-lock.json`. This site uses pnpm, so `studio/Dockerfile`,
  `studio/scripts/dependencies.ts` and `studio/scripts/siteCache.ts` need switching to
  `pnpm-lock.yaml`. That's a small patch, not done yet because it only matters for hosting.
- Pages has no `/__studio-deployment` endpoint, so the editor can't confirm a publish went live.
  A Pages Function in `functions/` can supply it.

Nothing on Cloudflare has been created, and no DNS or Pages settings have changed. All of the
hosting steps wait for the owner's go-ahead.

## Changes to the upstream editor

Kept small so a later Stacki release can be copied over:

- `studio/src/shared/validation.ts`: allows `[` and `]` in file paths. Our dynamic routes
  (`src/pages/places/[slug].astro`) were otherwise rejected with "Invalid project path". `..`
  and dotfiles are still refused.
- `studio/src/features/project/projectServer.ts`: the site name in the editor comes from
  `STUDIO_SITE_NAME` (set to "Travedise" by `pnpm studio`) instead of "Example site".
- `studio/cloudflare/wrangler.jsonc`: our repository, `cms` branch and `repository` access.

Changes on the site side so the editor can read our content:

- `src/content.config.ts`: `z.tuple(...)` became `z.array(...).length(n)`. Tuples crashed the
  editor's Places view; the new form checks the same counts at build time.
- `src/styles/global.css`: Tailwind no longer scans `studio/` (it was adding about 4 KB of unused CSS).
- `tsconfig.json`: `studio/` is excluded from the site's type check (it has its own).

Stacki's own test suite (`npm --prefix studio test`): 207 of 210 pass. The 3 failures read
components from Stacki's demo site (`src/components/typography/Heading.astro` and so on), which
this site doesn't have.
