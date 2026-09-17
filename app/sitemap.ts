import { execFileSync } from "node:child_process";

import type { MetadataRoute } from "next";

import { blogPosts } from "@/content/blog";
import { packages } from "@/content/packages";
import { SITE_URL } from "@/lib/site";

// Static export: generated once at build, so it always lists what the build contains.
export const dynamic = "force-static";

/** Each URL with the files its content comes from — `lastmod` is their latest commit date. */
const ENTRIES: { path: string; sources: string[] }[] = [
  {
    path: "/",
    sources: ["app/page.tsx", "components/home", "content/home.ts", "content/packages.ts"],
  },
  {
    path: "/packages",
    sources: ["app/packages/page.tsx", "components/packages", "content/packages.ts"],
  },
  { path: "/about", sources: ["app/about/page.tsx", "components/about", "content/about.ts"] },
  { path: "/blog", sources: ["app/blog/page.tsx", "content/blog.ts"] },
  { path: "/faq", sources: ["app/faq/page.tsx", "content/faqs.ts"] },
  {
    path: "/contact",
    sources: ["app/contact/page.tsx", "components/contact", "content/contact.ts"],
  },
  { path: "/privacy", sources: ["app/privacy/page.tsx", "content/privacy.ts"] },
  ...Object.values(packages).map((p) => ({
    path: p.href,
    sources: [`app${p.href}/page.tsx`, "components/package-detail", "content/package-details.ts"],
  })),
  ...blogPosts.map((p) => ({
    path: p.href,
    sources: [`app${p.href}/page.tsx`, "components/blog", `content/blog-posts/${p.slug}.ts`],
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
