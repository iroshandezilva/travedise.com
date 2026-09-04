# travedise.com — Next.js port

A pixel-for-pixel port of the published Webflow site at `travedise.com` to Next.js 16
(App Router, TypeScript, statically prerendered). Every page's markup, stylesheet,
assets and Webflow runtime are the originals; only the delivery changed.

## Routes

| Route | Source page |
| --- | --- |
| `/` | `index.html` |
| `/about` | `about.html` |
| `/packages` | `packages.html` |
| `/packages/{best-of-sri-lanka,dream-honeymoon-in-sri-lanka,hillcountry,scenic-sri-lanka,simply-srilanka,wildlife-package}` | `packages/*.html` |
| `/blog` | `blog.html` |
| `/blog-posts/{family-friendly-destinations-that-everyone-will-love,the-ultimate-honeymoon-destination,why-2026-is-the-best-year-for-travel-and-tour}` | `blog-posts/*.html` |
| `/contact` | `contact.html` |
| `/faq` | `faq.html` |

`<head>` metadata (title, description, Open Graph, Twitter, favicons) is expressed
through the App Router `metadata` API.

## Layout

```
app/                     one page.tsx per route + the shared root layout
components/
  webflow-scripts.tsx    boots the Webflow runtime after hydration
public/css/              the Webflow stylesheet, byte-identical apart from asset URLs
public/js/               jQuery, the Webflow chunks, GSAP — unmodified
public/assets/           every image, font, Lottie and SVG the site references
scripts/                 the one-shot converter and the verification harness
```

## How the Webflow runtime is wired in

Two things about Webflow's runtime do not survive a naive port, and both are handled
in `components/webflow-scripts.tsx` and `app/layout.tsx`:

1. **The runtime has to boot after hydration.** Webflow's IX2 engine writes the
   initial state of every page-load interaction as inline styles (collapsed FAQ
   answers, staged reveals, hidden images). If it runs before React hydrates —
   as it does in the published site, where the scripts are blocking tags at the
   end of `<body>` — hydration reverts those styles. The chain is therefore
   injected from an effect, one script at a time with `async = false` so the
   documented execution order (jQuery → shared chunks → the page's feature bundle
   → GSAP) is preserved, and finished with Webflow's own `IX2_PAGE_UPDATE` event.

2. **`data-wf-page` has to be on `<html>`.** IX2 addresses interaction targets as
   `<data-wf-page>|<data-w-id>`; without the page id, roughly half the
   interactions silently fail to bind. It cannot come from the shared root layout,
   so each page passes its id to `<WebflowScripts>`, which sets the attribute
   before booting the runtime.

`app/layout.tsx` additionally restores the `w-mod-*` / `wf-*` classes that Webflow
and the font loader put on `<html>` before hydration, which React otherwise clears.

Internal links are plain `<a href>`, matching the published site: each navigation is
a full document load, so the runtime always initialises against a fresh DOM.

## Regenerating from the Webflow export

The pages are generated, not hand-written. With the SiteSucker export in place:

```bash
node scripts/copy-assets.mjs   # collect + sanitise every referenced asset
node scripts/rewrite-css.mjs   # point the stylesheet at /assets
node scripts/convert.mjs       # emit app/**/page.tsx from the HTML
pnpm exec prettier --write "app/**/*.tsx"
```

`SRC` at the top of each script points at the export directory.

## Verifying the port

With `pnpm build && pnpm start -p 3111` running, and the original export served at
`http://localhost:8111`:

```bash
node scripts/verify-dom.mjs      # element-by-element diff of both renders
node scripts/verify-assets.mjs   # every referenced URL resolves
```

`verify-dom` compares the full element tree — tags, attributes and text — of each
route against its source page, normalising only the asset URLs that were rewritten.

## Development

```bash
pnpm install
pnpm dev
```
