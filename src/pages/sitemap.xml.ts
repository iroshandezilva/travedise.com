import { execFileSync } from "node:child_process";

import { notes } from "@/data/blog";
import { packageV2Slugs } from "@/data/v2/packages";
import { placeSlugs } from "@/data/v2/places";
import { SITE_URL } from "@/lib/site";

/** Each URL with the files its content comes from — `lastmod` is their latest commit date. */
const ENTRIES: { path: string; sources: string[] }[] = [
  {
    path: "/",
    sources: ["src/pages/index.astro", "src/components/v2", "src/content/pages/home.json"],
  },
  {
    path: "/packages",
    sources: [
      "src/pages/packages/index.astro",
      "src/components/v2/packages",
      "src/content/pages/journeys.json",
    ],
  },
  {
    path: "/places",
    sources: [
      "src/pages/places/index.astro",
      "src/components/v2/places",
      "src/content/pages/places.json",
      "src/content/places",
    ],
  },
  {
    path: "/when-to-go",
    sources: [
      "src/pages/when-to-go.astro",
      "src/components/v2/when-to-go",
      "src/content/pages/when-to-go.json",
    ],
  },
  {
    path: "/about",
    sources: ["src/pages/about.astro", "src/components/v2/about", "src/content/pages/about.json"],
  },
  {
    path: "/blog",
    sources: ["src/pages/blog.astro", "src/components/v2/blog", "src/content/blog"],
  },
  { path: "/faq", sources: ["src/pages/faq.astro", "src/content/pages/faq.json"] },
  {
    path: "/plan-your-trip",
    sources: [
      "src/pages/plan-your-trip.astro",
      "src/components/v2/plan",
      "src/components/islands/trip-form.tsx",
      "src/content/pages/plan.json",
    ],
  },
  { path: "/privacy", sources: ["src/pages/privacy.astro", "src/content/pages/privacy.json"] },
  ...packageV2Slugs.map((slug) => ({
    path: `/packages/${slug}`,
    sources: [
      "src/pages/packages/[slug].astro",
      "src/components/v2/package",
      `src/content/packages/${slug}.json`,
    ],
  })),
  ...placeSlugs.map((slug) => ({
    path: `/places/${slug}`,
    sources: [
      "src/pages/places/[slug].astro",
      "src/components/v2/places",
      `src/content/places/${slug}.json`,
    ],
  })),
  ...notes.map((n) => ({
    path: n.href,
    sources: [
      "src/pages/blog-posts/[slug].astro",
      "src/components/v2/blog",
      `src/content/blog/${n.slug}.json`,
    ],
  })),
];

/** ISO date of the last commit touching `paths`, or undefined outside a git checkout. */
function lastCommitDate(paths: string[]): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

/** Generated once at build, so it always lists what the build contains. */
export function GET() {
  const urls = ENTRIES.map(({ path, sources }) => {
    const loc = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    const lastmod = lastCommitDate(sources);
    return `<url>\n<loc>${loc}</loc>\n${lastmod ? `<lastmod>${lastmod}</lastmod>\n` : ""}</url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
