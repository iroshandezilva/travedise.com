import type { MetadataRoute } from "next";

import { blogPosts } from "@/content/blog";
import { packages } from "@/content/packages";

// Static export: generated once at build, so it always lists what the build contains.
export const dynamic = "force-static";

const SITE = "https://travedise.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/packages", "/about", "/blog", "/faq", "/contact"];
  const paths = [
    ...pages,
    ...Object.values(packages).map((p) => p.href),
    ...blogPosts.map((p) => p.href),
  ];
  return paths.map((path) => ({ url: path === "/" ? SITE : `${SITE}${path}` }));
}
