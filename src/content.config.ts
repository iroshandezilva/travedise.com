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
        z.object({ type: z.literal("figure"), src: z.string(), alt: z.string(), caption: z.string() }),
        z.object({ type: z.literal("quote"), text: z.string() }),
        z.object({ type: z.literal("note"), label: z.string(), text: z.string() }),
      ]),
    ),
    next: z.object({ label: z.string(), href: z.string() }).optional(),
    cta: z.object({ heading: z.string(), em: z.string().optional(), body: z.string() }).optional(),
    seo,
  }),
});

export const collections = { places, packages, blog };
