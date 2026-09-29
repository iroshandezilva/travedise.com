import { execFileSync } from "node:child_process";

import type { MetadataRoute } from "next";

import { notes } from "@/content/blog";
import { packageV2Slugs } from "@/content/v2/packages";
import { SITE_URL } from "@/lib/site";

// Static export: generated once at build, so it always lists what the build contains.
export const dynamic = "force-static";

/** Each URL with the files its content comes from — `lastmod` is their latest commit date. */
const ENTRIES: { path: string; sources: string[] }[] = [
  { path: "/", sources: ["app/page.tsx", "components/v2", "content/v2"] },
  {
    path: "/packages",
    sources: ["app/packages/page.tsx", "components/v2/packages", "content/v2/journeys.ts"],
  },
  {
    path: "/when-to-go",
    sources: ["app/when-to-go/page.tsx", "components/v2/when-to-go", "content/v2/when-to-go.ts"],
  },
  {
    path: "/about",
    sources: ["app/about/page.tsx", "components/v2/about", "content/v2/about.ts"],
  },
  { path: "/blog", sources: ["app/blog/page.tsx", "components/v2/blog", "content/blog"] },
  { path: "/faq", sources: ["app/faq/page.tsx", "content/faqs.ts"] },
  {
    path: "/plan-your-trip",
    sources: ["app/plan-your-trip/page.tsx", "components/v2/plan", "content/v2/plan.ts"],
  },
  { path: "/privacy", sources: ["app/privacy/page.tsx", "content/privacy.ts"] },
  ...packageV2Slugs.map((slug) => ({
    path: `/packages/${slug}`,
    sources: ["app/packages/[slug]/page.tsx", "components/v2/package", "content/v2/packages.ts"],
  })),
  ...notes.map((n) => ({
    path: n.href,
    sources: ["app/blog-posts/[slug]/page.tsx", "components/v2/blog", `content/blog/posts/${n.slug}.ts`],
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

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map(({ path, sources }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: lastCommitDate(sources),
  }));
}
