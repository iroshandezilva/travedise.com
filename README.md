# travedise.com

Marketing site for Travedise — Sri Lanka tour packages. Next.js 16 (App Router), React 19,
Tailwind CSS v4, deployed as a fully static export to Cloudflare Pages.

- `main` → https://travedise.com
- `dev` → https://dev.travedise.pages.dev

## Development

```bash
pnpm install
pnpm dev                          # http://localhost:3000
pnpm build && npx serve out       # preview the production (static) build
```

`next.config.ts` sets `output: "export"`, so everything must be static: no route handlers that read
the request, middleware, server actions, `cookies()`/`headers()`, or dynamic routes without
`generateStaticParams`. `pnpm start` doesn't work with a static export.

## Structure

```
app/                  routes — each page.tsx composes sections and exports its metadata
  globals.css         Tailwind import, design tokens (@theme), base typography, <Reveal> styles
  fonts.ts            next/font: General Sans, Boska (local), Inter Tight (Google)
components/
  ui/                 primitives: ArrowButton, PillButton, OutlinePill, TextRoll, SectionTag, Reveal
  site/               shared across pages: Navbar, Footer, FaqSection, PackageCard, BlogCard, …
  home/ about/        page-specific sections (original design)
  v2/                 the new design: shared nav, footer, CTAs; v2/blog is the travel notes
content/              typed page content: packages, package details, blog posts, FAQs, …
lib/cn.ts             className helper (clsx + tailwind-merge aware of our tokens)
public/assets/        images and icons
```

Copy lives in `content/`, not in JSX — to change a package, FAQ or blog post, edit the data file.

To add a travel note, add a file to `content/blog/posts/` (copy an existing one) and list it in
`content/blog/index.ts`. The template at `app/blog-posts/[slug]/page.tsx` builds its page, and
`/blog`, the sitemap and "Keep reading" pick it up. Reading time is counted from the text.

## Styling

- **Tailwind utilities only** — no CSS files beyond `app/globals.css`, no CSS modules.
- **Desktop-first**, matching the original design: unprefixed classes are desktop, then override
  with `max-lg:` (≤991px), `max-md:` (≤767px), `max-sm:` (≤479px).
- **Tokens** (`app/globals.css`): colors `navy`, `navy-800`, `slate`, `slate-300/400`, `lime`,
  `surface`, `line`…; fonts `font-sans` (body), `font-heading`, `font-serif`, `font-boska`;
  `text-h1`…`text-h6` (shrink per breakpoint automatically), `text-body-lg`; `rounded-card`,
  `rounded-panel`; `container-site` for the 1271px page container; `ease-out-quart` etc.
- **Motion**: CSS transitions/keyframes. Scroll-in animations use `<Reveal from delay>`;
  hover effects use `group-hover:`. Anything larger than a hover respects `prefers-reduced-motion`.
- Reuse `components/ui` and `components/site` before writing new markup.

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
