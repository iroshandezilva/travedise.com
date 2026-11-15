import { execFileSync } from "node:child_process";

import { notes } from "@/data/blog";
import { groupTypes, packages, places, vehicles, weddingStyles } from "@/data/content";
import { SITE_URL } from "@/lib/site";

/** Each URL with the files its content comes from; `lastmod` is their latest commit date. */
const page = (path: string, ...sources: string[]) => ({ path, sources: [`src/pages${path === "/" ? "/index" : path}.astro`, ...sources] });
const each = <T extends { slug: string }>(items: T[], base: string, template: string, content: string) =>
  items.map((i) => ({ path: `${base}/${i.slug}`, sources: [template, `${content}/${i.slug}.json`, "src/components"] }));

const ENTRIES: { path: string; sources: string[] }[] = [
  page("/", "src/components", "src/data/site.ts"),
  page("/destinations", "src/data/site.ts"),
  page("/destinations/sri-lanka", "src/data/destinations.ts", "src/content/pages/when-to-go.json"),
  page("/destinations/maldives", "src/data/destinations.ts"),
  page("/packages", "src/content/packages"),
  ...each(packages, "/packages", "src/pages/packages/[slug].astro", "src/content/packages"),
  page("/places", "src/content/places"),
  ...each(places, "/places", "src/pages/places/[slug].astro", "src/content/places"),
  page("/when-to-go", "src/content/pages/when-to-go.json"),
  page("/services", "src/data/site.ts"),
  page("/weddings", "src/content/weddings"),
  page("/weddings/plan"),
  ...each(weddingStyles, "/weddings", "src/pages/weddings/[slug].astro", "src/content/weddings"),
  page("/group-vacations", "src/content/groups"),
  ...each(groupTypes, "/group-vacations", "src/pages/group-vacations/[slug].astro", "src/content/groups"),
  page("/vehicles", "src/content/vehicles"),
  ...each(vehicles, "/vehicles", "src/pages/vehicles/[slug].astro", "src/content/vehicles"),
  page("/blog", "src/content/blog"),
  ...notes.map((n) => ({ path: n.href, sources: ["src/pages/blog-posts/[slug].astro", `src/content/blog/${n.slug}.json`] })),
  page("/about", "src/content/pages/about.json"),
  page("/plan-your-trip", "src/content/pages/plan.json"),
  page("/faq", "src/content/pages/faq.json"),
  page("/privacy", "src/content/pages/privacy.json"),
  page("/sitemap"),
];

const buildDate = new Date().toISOString();

/** ISO date of the last commit touching `paths`; the build date for files not committed yet. */
function lastmod(paths: string[]): string {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || buildDate;
  } catch {
    return buildDate;
  }
}

/** Generated once at build, so it always lists what the build contains. */
export function GET() {
  const urls = ENTRIES.map(({ path, sources }) => {
    const loc = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    return `<url>\n<loc>${loc}</loc>\n<lastmod>${lastmod(sources)}</lastmod>\n</url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
