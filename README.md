# travedise.com

Marketing site for Travedise — Sri Lanka tour packages. Astro 7, Tailwind CSS v4, two small React
islands, deployed as a fully static site to Cloudflare Pages.

- `main` → https://travedise.com
- `dev` → https://dev.travedise.pages.dev

## Development

```bash
pnpm install
pnpm dev                          # http://localhost:4321
pnpm build && pnpm preview        # preview the production (static) build
pnpm test                         # checks the build in dist/ — run after pnpm build
```

The site is fully static (`output: "static"`): every page is HTML at build time. Pages are written
as `about.html`, not `about/index.html` (`build.format: "file"`), which is what Cloudflare Pages,
`public/_routes.json` and the tests expect. Dynamic routes list their pages in `getStaticPaths`.
The only server code is the Cloudflare Pages Functions in `functions/`.

## Structure

```
src/
  pages/              routes — each .astro page composes sections and sets its <Base> metadata
  layouts/base.astro  <html>, meta tags, fonts, JSON-LD, live chat, shared scripts
  components/v2/      sections and shared pieces (nav, footer, buttons, CTAs, accordion)
  components/islands/ the two React components hydrated in the browser: trip form, journeys map
  components/ui/      Reveal (scroll-in animation)
  content/            the words and photos, as JSON (see below)
  content.config.ts   schemas for the places, journeys and travel notes collections
  data/               typed modules pages import; they read src/content and add derived fields
  scripts/            small browser scripts shared by every page (reveal, WebMCP)
  styles/global.css   Tailwind import, design tokens (@theme), base typography, component CSS
  lib/                cn(), site constants, socials, structured data
public/               images, video and the static files Cloudflare reads (_redirects, _headers…)
functions/            Cloudflare Pages Functions: the enquiry form and the Markdown middleware
scripts/agent-files.mjs  writes the Markdown copies of each page, llms.txt and .well-known after the build
```

Copy lives in `src/content/`, not in markup — to change a package, place, FAQ or travel note, edit
its JSON file. `pnpm build` checks the places, journeys and notes against the schemas in
`src/content.config.ts`, so a missing field fails the build instead of breaking a page.

- One file per place in `src/content/places/`, per journey in `src/content/packages/` (both
  ordered by their `order` field), and per travel note in `src/content/blog/`.
- Page-level words are in `src/content/pages/*.json`; words shared across pages (nav, menu,
  gallery, questions) and contact details are in `src/content/site/*.json`.

To add a travel note, copy a file in `src/content/blog/` and change it. The template at
`src/pages/blog-posts/[slug].astro` builds its page, and `/blog`, the sitemap and "Keep reading"
pick it up. Reading time is counted from the text.

## Styling

- **Tailwind utilities only** — no CSS files beyond `src/styles/global.css`.
- **Desktop-first**, matching the original design: unprefixed classes are desktop, then override
  with `max-lg:` (≤991px), `max-md:` (≤767px), `max-sm:` (≤479px).
- **Tokens** (`src/styles/global.css`): the `v2-*` colours (`v2-navy`, `v2-cream`, `v2-sky`…),
  `font-display` (Ragmont) and `font-sans` (Inter Tight), `container-v2` / `gutter-v2` for the
  1280px page column, `ease-out-quart` etc. Fonts are configured in `astro.config.mjs`.
- **Motion**: CSS transitions/keyframes. Scroll-in animations use `<Reveal from delay>`;
  anything larger than a hover respects `prefers-reduced-motion`.
- **Interactivity**: plain `<script>` tags in the component (menus, accordions, filters). React
  is only for the trip form and the journeys map.
- Reuse `src/components/v2` before writing new markup.

## Deploys and workflow

Pushes to `dev` and `main` deploy via `.github/workflows/deploy.yml` (Cloudflare Pages project
`travedise`). All changes go through a branch → PR into `dev`; `dev` → `main` is a release PR.
See `CLAUDE.md` for the full workflow.

## Trip enquiry email

The Plan your trip form posts to `/api/enquiry` (`functions/api/enquiry.js`, a Cloudflare Pages
Function that runs next to the static site). It sends two emails through the Zoho Mail API from
`contact@travedise.com`: the full enquiry to us, and a copy of the same submission to the address
the traveller typed in. Zoho's API has no reply-to, so our copy starts with the traveller's address.

It needs these secrets on the Cloudflare Pages project `travedise` (Settings → Variables and
Secrets, for both Production and Preview):

| Name | Value |
| --- | --- |
| `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET` | from a **Self Client** at https://api-console.zoho.com |
| `ZOHO_REFRESH_TOKEN` | generated once from that Self Client (steps below) |
| `ZOHO_ACCOUNT_ID` | the mailbox's account id (steps below) |
| `ZOHO_DOMAIN` | optional: `com` (default), `eu`, `in`, `com.au`, `jp` or `ca` — where the Zoho account lives |
| `ENQUIRY_FROM`, `ENQUIRY_TO` | optional: both default to `contact@travedise.com` |

Getting the refresh token and account id (use your data centre's domain in place of `.com`):

1. In https://api-console.zoho.com, add a **Self Client**, copy its Client ID and Secret.
2. Under **Generate Code**, scope `ZohoMail.messages.CREATE,ZohoMail.accounts.READ`, duration
   10 minutes. Copy the code.
3. Exchange it (within 10 minutes):
   `curl -X POST "https://accounts.zoho.com/oauth/v2/token?grant_type=authorization_code&client_id=ID&client_secret=SECRET&code=CODE"`
   — keep the `refresh_token` from the reply; copy the `access_token` for the next step.
4. `curl -H "Authorization: Zoho-oauthtoken ACCESS_TOKEN" https://mail.zoho.com/api/accounts`
   — the `accountId` of the `contact@travedise.com` mailbox is `ZOHO_ACCOUNT_ID`.

Without the secrets the endpoint answers 503 and the form tells the visitor to email us directly.
