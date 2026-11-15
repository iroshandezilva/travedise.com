# travedise.com

Marketing site for Travedise: tailor-made trips to Sri Lanka and the Maldives, weddings, group
trips and vehicles with drivers. Astro 7 with plain CSS and one small script, deployed as a fully
static site to Cloudflare Pages.

- `main` → https://travedise.com
- `dev` → https://dev.travedise.pages.dev

## Development

```bash
pnpm install
pnpm dev                          # http://localhost:4321
pnpm build && pnpm preview        # preview the production (static) build
pnpm test                         # checks the build in dist/ — run after pnpm build
```

Needs **Node 22.12+** and pnpm.

The site is fully static (`output: "static"`): every page is HTML at build time. Pages are written
as `about.html`, not `about/index.html` (`build.format: "file"`), which is what Cloudflare Pages,
`public/_routes.json` and the tests expect. Dynamic routes list their pages in `getStaticPaths`.
The only server code is the Cloudflare Pages Functions in `functions/`.

## Structure

```
src/
  pages/              routes; each page composes components and sets its <Base> metadata
  layouts/Base.astro  <html>, meta tags, fonts, JSON-LD, header, footer, live chat, shared script
  components/         Header, Footer, Frame (every photo), PageHero, PageHead, Band, CloseBand,
                      SecHead, Faq, Steps, TourCard, NoteCard
  assets/photos/      the site's own photos; assets/stock/ free Unsplash photos used until the shoot
  content/            collections (packages, places, notes, vehicles, weddings, groups) and page JSON
  content.config.ts   schemas for the collections
  data/               typed modules pages import: photos (registry), site (tours, trip types,
                      services, contact), destinations (Sri Lanka and Maldives), content (collections)
  scripts/site.ts     the one browser script: header, menus, tabs, filters, itinerary, form, film
  styles/global.css   design tokens and every class the pages use
  lib/                site constants, socials, structured data, WebMCP data
public/               older images, video and the static files Cloudflare reads (_redirects, _headers…)
functions/            Cloudflare Pages Functions: the enquiry form and the Markdown middleware
scripts/agent-files.mjs  writes the Markdown copies of each page, llms.txt and .well-known after the build
```

Repeating content (packages, places, notes, vehicles, wedding styles, group types) lives in
`src/content/` as JSON and is checked against `src/content.config.ts` at build. One-off page text
is in the page components. Lists shared by several pages are in `src/data/`.

To add a travel note, copy a file in `src/content/blog/` and change it. The template at
`src/pages/blog-posts/[slug].astro` builds its page, and `/blog`, the sitemap and the related
notes pick it up.

## Design

- One white editorial look: full-bleed photo bands alternate with white blocks, and two photo
  bands never sit next to each other. No overline labels, no clocks.
- **Type**: Newsreader (standing in for Nocturne Serif until a webfont licence is bought) for
  headings, Schibsted Grotesk for text. Fonts are configured in `astro.config.mjs`.
- **Tokens** at the top of `src/styles/global.css`: the brown palette (`--ink`, `--bark`,
  `--clay`, `--stone`, `--wash`) and one type scale (`--fs-display` … `--fs-cap`) that every page
  reads. Headings shrink fluidly from desktop (1440px) to phone (375px).
- **Photos**: always through `<Frame photo="key">` (keys in `src/data/photos.ts`), so Astro
  resizes and converts them. Stock photos are credited on `/sitemap`.
- **Motion**: the hero line rises once per visit, photos drift slightly on scroll, menus and
  hovers ease. All of it stops with `prefers-reduced-motion`.
- **Interactivity**: `src/scripts/site.ts` only. Each part looks for its own markup, and every
  page reads fully without JavaScript.

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
