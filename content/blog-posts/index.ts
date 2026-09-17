import type { BlogSlug } from "@/content/blog";

import { body as familyFriendly } from "./family-friendly-destinations-that-everyone-will-love";
import { body as honeymoon } from "./the-ultimate-honeymoon-destination";
import type { BlogPostBody } from "./types";
import { body as why2026 } from "./why-2026-is-the-best-year-for-travel-and-tour";

export * from "./types";

/** Post bodies by slug. Card data (title, dates, image) lives in `content/blog.ts`. */
export const blogPostBodies: Record<BlogSlug, BlogPostBody> = {
  "the-ultimate-honeymoon-destination": honeymoon,
  "family-friendly-destinations-that-everyone-will-love": familyFriendly,
  "why-2026-is-the-best-year-for-travel-and-tour": why2026,
};
