# Content editor (Stacki Studio)

A visual editor for the site's words and photos. It lives in `studio/` (a copy of
[Stacki Studio](https://github.com/flowtricks/stacki-studio) v0.0.1, MIT, with two small patches
listed below). Editors change text and images; layout and code stay in the normal PR workflow.

**Status:** runs locally. The code for hosting it at `travedise.com/studio` is ready; the
owner's one-time Cloudflare and GitHub steps are in [Host the editor](#host-the-editor-travedisecomstudio).

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

`studio/cloudflare/wrangler.jsonc` sets `EDITOR_ACCESS` to `"allowlist"`: only the GitHub
accounts whose numeric IDs are in `EDITOR_GITHUB_IDS` can sign in to the hosted editor.

- An editor needs a free GitHub account (github.com/signup) to sign in, and nothing else.
  They are **not** added to the repository: Publish goes through the GitHub App, so an editor
  can't push code, open the code or merge PRs. Every publish still waits for the owner to merge.
- **Add an editor:** get their ID with `gh api users/<their-username> --jq .id`, add it to
  `EDITOR_GITHUB_IDS` (comma-separated) in a PR, merge it, then redeploy the editor Worker
  (step 5 below). **Remove one** the same way.
- Never set `EDITOR_ACCESS` to `"github"` (anyone with a GitHub account could edit) or
  `"repository"` (editors would need Write access, which also lets them merge PRs).
  `tests/cms.test.mjs` fails the build if the setting changes or the owner's ID is removed.

The local editor has no sign-in. It only listens on `127.0.0.1`, so only your own computer can
reach it.

## Host the editor (travedise.com/studio)

**Cost:** Workers Paid, $5/month, plus roughly $0–2 of use with light editing. The editor's
container sleeps a few minutes after the last editor leaves. Set a Cloudflare budget alert at
$10; alerts notify, they don't cap spending.

**How it fits together:**

```
travedise.com/*        → Cloudflare Pages (the site, unchanged)
travedise.com/studio*  → functions/studio/[[path]].js → service binding STUDIO → editor Worker
preview.travedise.com  → editor Worker (the live preview inside the editor)
editor Worker          → Container (Astro preview) + R2 bucket (drafts) + GitHub App (Publish)
```

The code side is done: the container installs the site with pnpm, the Pages Function forwards
`/studio`, and the config has the real addresses. Live-deploy checking is off on purpose
(`SITE_DEPLOYMENT_URL` is empty): a publish only reaches the site after you merge the CMS PR, so
there is no deploy to wait for.

### Owner setup, in order

1. **Cloudflare plan.** Dashboard → Workers & Pages → Plans → **Workers Paid**. Then Billing →
   budget alert at $10.
2. **GitHub App** (github.com → Settings → Developer settings → GitHub Apps → New GitHub App):
   - Name: `Travedise CMS`. Homepage URL: `https://travedise.com`.
   - Callback URL: `https://travedise.com/studio/auth/callback`.
   - Webhook: untick **Active**.
   - Repository permissions: **Contents: Read and write**, **Metadata: Read-only**. Nothing else.
   - Where can it be installed: **Only on this account**. Create it.
   - On the App page: note the **App ID** and **Client ID**. Click **Generate a new client
     secret** and keep it. Under Private keys, **Generate a private key** (downloads a `.pem`).
     Keep both outside the repository.
   - Install App → choose **Only select repositories** → `travedise.com`. The address then ends in
     `/installations/<number>`: that number is the **Installation ID**.
   - Send Claude the App ID, Client ID and Installation ID (they aren't secret). They go into
     `studio/cloudflare/wrangler.jsonc` in a small PR.
3. **Repository setting.** GitHub → the repo → Settings → Actions → General → tick **Allow GitHub
   Actions to create and approve pull requests** (so `cms.yml` can open the CMS PR). Leave `cms`
   unprotected.
4. **Drafts bucket.** In a terminal, from the repository root on an up-to-date `dev`:

   ```bash
   cd studio && npx wrangler login
   export CLOUDFLARE_ACCOUNT_ID=c875c02d0b617757f8c631be7664e6c5
   npx wrangler r2 bucket create stacki-studio-editor-drafts
   ```

5. **Deploy the editor Worker.** Docker Desktop must be running (it builds the container image).

   ```bash
   npm ci && npm run build
   npx wrangler deploy --config cloudflare/wrangler.jsonc
   ```

6. **Secrets** (each command asks for the value; nothing is saved in files):

   ```bash
   npx wrangler secret put GITHUB_PRIVATE_KEY   --config cloudflare/wrangler.jsonc  # paste the whole .pem
   npx wrangler secret put GITHUB_CLIENT_SECRET --config cloudflare/wrangler.jsonc
   openssl rand -hex 32   # run twice; use one value for each of the next two
   npx wrangler secret put SESSION_SECRET       --config cloudflare/wrangler.jsonc
   npx wrangler secret put CONTAINER_TOKEN      --config cloudflare/wrangler.jsonc
   ```

7. **Preview address.** Dashboard → Workers & Pages → `stacki-studio-editor` → Settings →
   Domains & Routes → Add → **Custom domain** → `preview.travedise.com`. Cloudflare adds the DNS
   record itself.
8. **Connect the site to the editor.** Dashboard → Workers & Pages → `travedise` (Pages) →
   Settings → Bindings → Add → **Service binding**: variable name `STUDIO`, service
   `stacki-studio-editor`, **Production** only.
9. **Release.** The `/studio` function reaches the live site with the next `dev` → `main`
   release. Until steps 1–8 are done, `travedise.com/studio` shows "The editor is not available
   yet" and the rest of the site is unaffected.
10. **Check before inviting anyone:** open `travedise.com/studio` and sign in with GitHub; try a
    GitHub account that isn't on the list and confirm it's refused; edit a sentence, upload a
    photo, press Publish and confirm a "Content updates from the CMS" PR opens into `dev`; open
    the editor on a phone.
11. **Invite your editor:** add their GitHub ID (see [Who can edit](#who-can-edit)), redeploy
    (step 5's `npx wrangler deploy` line) and send them `https://travedise.com/studio`.

To take the editor offline, remove the `STUDIO` service binding (step 8). The site keeps working.

## Changes to the upstream editor

Kept small so a later Stacki release can be copied over:

- `studio/src/shared/validation.ts`: allows `[` and `]` in file paths. Our dynamic routes
  (`src/pages/places/[slug].astro`) were otherwise rejected with "Invalid project path". `..`
  and dotfiles are still refused.
- `studio/src/features/project/projectServer.ts`: the site name in the editor comes from
  `STUDIO_SITE_NAME` (set to "Travedise" by `pnpm studio`) instead of "Example site".
- `studio/cloudflare/wrangler.jsonc`: our repository, `cms` branch, allowlist access and our origins.
- `studio/Dockerfile`, `studio/scripts/siteCache.ts`, `studio/scripts/dependencies.ts`,
  `studio/scripts/container.ts`: the container installs the site with pnpm from `pnpm-lock.yaml`
  (Stacki assumes npm). One test added in `studio/test/workspace.test.ts`.

Changes on the site side so the editor can read our content:

- `src/content.config.ts`: `z.tuple(...)` became `z.array(...).length(n)`. Tuples crashed the
  editor's Places view; the new form checks the same counts at build time.
- `src/styles/global.css`: Tailwind no longer scans `studio/` (it was adding about 4 KB of unused CSS).
- `tsconfig.json`: `studio/` is excluded from the site's type check (it has its own).
- `functions/studio/[[path]].js`: forwards `/studio` to the editor Worker; `functions/_middleware.js`
  leaves `/studio` alone.

Stacki's own test suite (`npm --prefix studio test`): 207 of 210 pass. The 3 failures read
components from Stacki's demo site (`src/components/typography/Heading.astro` and so on), which
this site doesn't have.
