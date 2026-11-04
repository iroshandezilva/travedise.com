---
name: travel-seo-brief
description: Turning one core idea into a search- and marketing-ready page for Travedise — search intent, title, meta description, heading outline, internal links and the seo field, mapped onto the blog, places and packages JSON. Load before writing or rewriting a travel note, place or package.
---

# From core idea to a page that gets found

## 1. Start from one core idea

Write it as one sentence a traveller would agree with: "In almost any month, one side of Sri Lanka
is dry." If you can't say it in one sentence, the page is two pages. Everything else on the page
serves that sentence.

## 2. Find the search intent

Write down the question someone types before they would want this page, and what kind of answer
they expect:

| Intent | Example query | Best home |
|---|---|---|
| Planning | "best time to visit sri lanka" | Travel note (`Planning`) or `/when-to-go` |
| Place | "ella sri lanka things to do" | Place page |
| Route | "sri lanka 10 day itinerary" | Package, plus a `Routes` note that links to it |
| Experience | "yala leopard safari tips" | Travel note (`Wildlife`) |

Check the existing pages first (`src/content/**`, `/blog`, `/places`, `/packages`). If one already
answers the query, improve it instead of writing a second page that competes with it.

Don't guess search volumes or claim rankings. If the owner wants keyword data, say it needs a tool
(for example Ahrefs or Search Console) and ask.

## 3. Map it onto the fields

**Travel note** (`src/content/blog/<slug>.json`)

| Field | SEO job | Rule |
|---|---|---|
| `slug` | URL `/blog-posts/<slug>` | Lowercase words with hyphens, contains the main phrase, no dates |
| `title` | `<h1>` and `<title>` | Contains the main phrase naturally, about 60 characters with " — Travedise" |
| `titleEm` | Italic ending | Exact ending of `title` |
| `standfirst` | First line under the h1 | What the reader gets |
| `dek` | Card text **and** meta description | 140–160 characters, opens with the answer |
| `category` | Groups notes | One of the schema's enum values |
| `body` `h2` | Outline and table of contents | Each h2 answers a sub-question; `id` is a short slug; `toc` is a short label if the h2 is long |
| `body` `table` | Featured-snippet bait | Use one when the answer is a comparison (months, coasts, regions) |
| `body` links | Internal links | `{ "text", "href" }` inline parts, see step 4 |
| `seo` | Optional overrides | `title` replaces the title in `<title>` only; `description` (≤160) replaces the dek as meta description. Use only when the on-page wording must differ from the search wording |

**Place** (`src/content/places/<slug>.json`): `summary` is the meta description (or
`seo.description`); the `<title>` is "<name>, Sri Lanka — Travedise" unless `seo.title` is set.
`intro.heading`, `doing.items[].title` and `season` carry the search phrases ("things to do",
"best time").

**Package** (`src/content/packages/<slug>.json`): `summary` is the meta description; `title`
should say the length or the shape ("Hill Country & Beach"); `facts` must state days, stops and
best months; `itinerary.days[].title` names the place for each day.

## 4. Internal links — every page earns and gives links

- A note links to every **place** it names (`/places/<slug>`), at the first mention only.
- A note about a route links to the **package** that runs it (`/packages/<slug>`).
- A note ends with a `next` or `cta` that leads to `/plan-your-trip` or a package.
- When you add a note, find two older notes or places that should link to it and add the link.
  "Keep reading" picks related notes automatically; links in the text are your job.

## 5. Marketing angle

For each page, also write in your reply (not in the JSON):

- **Hook** — the one line for a social post or newsletter.
- **Who it is for** — couples, families, first-timers, wildlife, culture.
- **The next step** — which package or plan page it should sell, and why.

## 6. Check before handing over

- `pnpm build` passes (the schema checks every field; `seo.description` over 160 fails).
- The `dek` or `seo.description` reads as a complete sentence under 160 characters.
- One `h1` (the title); `h2`s in order; no skipped levels.
- Every place named is linked once.
- Facts not in the content are marked `[CHECK: …]` (see the `travedise-voice` skill).
