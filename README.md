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
  home/ about/ contact/ packages/ package-detail/ blog/   page-specific sections
content/              typed page content: packages, package details, blog posts, FAQs, …
lib/cn.ts             className helper (clsx + tailwind-merge aware of our tokens)
public/assets/        images and icons
```

Copy lives in `content/`, not in JSX — to change a package, FAQ or blog post, edit the data file.

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
