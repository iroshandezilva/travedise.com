/**
 * Content collections — the places, journeys and travel notes, one JSON file each.
 *
 * Pages read these files through `src/data/**` (which adds the derived fields and keeps
 * the order). Declaring them here lets `astro build` check every file against its schema,
 * so an edit with a missing field fails the build instead of breaking a page.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const photo = z.object({ src: z.string(), alt: z.string(), position: z.string().optional() });
const anchor = z.enum(["start", "middle", "end"]);
/** Optional overrides for the page's <title> and meta description; the page falls back to its own title and summary. */
const seo = z
  .object({ title: z.string().optional(), description: z.string().max(160).optional() })
  .optional();

const places = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/places" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    name: z.string(),
    region: z.enum(["hill", "triangle", "southwest", "east", "parks"]),
    line: z.string(),
    image: photo,
    map: z.object({ cx: z.number(), cy: z.number(), tx: z.number(), ty: z.number(), anchor }),
    locatorAnchor: anchor.optional(),
    journeyStop: z.string().optional(),
    summary: z.string(),
    nights: z.string(),
    goodFor: z.string(),
    intro: z.object({ heading: z.string(), paragraphs: z.array(z.string()).length(2) }),
    mapCaption: z.string(),
    doing: z.object({
      lede: z.string(),
      items: z.array(z.object({ title: z.string(), body: z.string() })),
    }),
    gallery: z.array(photo).length(2).optional(),
    season: z.string(),
    journeysHeading: z.string().optional(),
    nearby: z.object({
      heading: z.string(),
      slugs: z.array(z.string()).length(3),
    }),
    ctaBody: z.string(),
    seo,
  }),
});

const packages = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/packages" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    shots: z.array(z.object({ src: z.string(), label: z.string() })),
    facts: z.array(z.object({ value: z.string(), detail: z.string() })),
    includes: z.object({
      heading: z.string(),
      body: z.string(),
      items: z.array(z.object({ title: z.string(), body: z.string() })),
    }),
    itinerary: z.object({
      heading: z.string(),
      lede: z.string(),
      days: z.array(
        z.object({
          meta: z.string(),
          title: z.string(),
          body: z.string(),
          stay: z.object({ name: z.string(), note: z.string().optional(), thumb: z.string() }),
          photos: z.array(z.object({ src: z.string(), caption: z.string() })),
        }),
      ),
    }),
    timeAnswer: z.string(),
    seo,
  }),
});

const inline = z.union([z.string(), z.object({ text: z.string(), href: z.string() })]);

const blog = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/blog" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    titleEm: z.string().optional(),
    standfirst: z.string(),
    dek: z.string(),
    category: z.enum(["Planning", "Routes", "Culture", "Wildlife", "Coast", "Families", "Couples"]),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    author: z.object({ name: z.string(), role: z.string() }),
    image: photo,
    body: z.array(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("lead"), text: z.array(inline) }),
        z.object({ type: z.literal("p"), text: z.array(inline) }),
        z.object({
          type: z.literal("h2"),
          id: z.string(),
          text: z.string(),
          toc: z.string().optional(),
        }),
        z.object({ type: z.literal("list"), items: z.array(z.array(inline)) }),
        z.object({
          type: z.literal("table"),
          caption: z.string(),
          columns: z.array(z.string()),
          rows: z.array(z.array(z.string())),
        }),
        z.object({
          type: z.literal("figure"),
          src: z.string(),
          alt: z.string(),
          caption: z.string(),
        }),
        z.object({ type: z.literal("quote"), text: z.string() }),
        z.object({ type: z.literal("note"), label: z.string(), text: z.string() }),
      ]),
    ),
    next: z.object({ label: z.string(), href: z.string() }).optional(),
    cta: z.object({ heading: z.string(), em: z.string().optional(), body: z.string() }).optional(),
    seo,
  }),
});

const titled = z.object({ title: z.string(), body: z.string() });
const question = z.object({ q: z.string(), a: z.string() });

/** The fleet, one category per file. `silhouette` picks the drawing on its card and hero. */
const vehicles = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/vehicles" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    name: z.string(),
    silhouette: z.enum(["car", "suv", "van", "minibus", "coach", "jeep"]),
    /** Smallest and largest party the vehicle seats in comfort, for the size filter. */
    seats: z.object({ min: z.number(), max: z.number() }),
    seatsLabel: z.string(),
    bags: z.string(),
    models: z.string(),
    short: z.string(),
    summary: z.string(),
    suits: z.array(z.string()),
    features: z.array(titled),
    included: z.array(z.string()),
    questions: z.array(question),
  }),
});

/** The wedding styles, one per file. `settings` are keys of the settings in pages/weddings.json. */
const weddings = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/weddings" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    name: z.string(),
    short: z.string(),
    summary: z.string(),
    image: photo,
    facts: z.array(z.object({ value: z.string(), detail: z.string() })),
    intro: z.object({ heading: z.string(), paragraphs: z.array(z.string()).length(2) }),
    schedule: z.object({
      heading: z.string(),
      lede: z.string(),
      items: z.array(z.object({ when: z.string(), title: z.string(), body: z.string() })),
    }),
    includes: z.object({ heading: z.string(), body: z.string(), items: z.array(titled) }),
    settings: z.array(z.string()),
    questions: z.array(question),
  }),
});

/** Group vacation types, one per file: services around a purpose, not a fixed route. */
const groups = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/groups" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    name: z.string(),
    theme: z.string(),
    size: z.string(),
    short: z.string(),
    summary: z.string(),
    image: photo,
    facts: z.array(z.object({ value: z.string(), detail: z.string() })),
    suits: z.object({ heading: z.string(), body: z.string(), points: z.array(z.string()) }),
    services: z.object({ heading: z.string(), body: z.string(), items: z.array(titled) }),
    shapes: z.object({
      heading: z.string(),
      lede: z.string(),
      items: z.array(z.object({ title: z.string(), length: z.string(), body: z.string() })),
    }),
    questions: z.array(question),
  }),
});

export const collections = { places, packages, blog, vehicles, weddings, groups };
