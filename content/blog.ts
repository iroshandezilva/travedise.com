/**
 * Blog posts as shown on cards (home + /about "Blog & Tips" section, /blog listing).
 * Text is copied verbatim from the Webflow CMS. The CMS has no categories or authors
 * (the author field on post pages is empty), so neither is modelled.
 */

export type BlogSlug =
  | "the-ultimate-honeymoon-destination"
  | "family-friendly-destinations-that-everyone-will-love"
  | "why-2026-is-the-best-year-for-travel-and-tour";

export type BlogPost = {
  slug: BlogSlug;
  href: `/blog-posts/${BlogSlug}`;
  title: string;
  /** Short summary on cards (also the post page's meta description). */
  excerpt: string;
  /** Date as printed on cards. */
  date: string;
  /** Date as printed in the post page hero. */
  heroDate: string;
  readingTime: string;
  /** Card image. */
  image: { src: string; srcSet?: string; sizes?: string };
};

const post = (p: Omit<BlogPost, "href">): BlogPost => ({ ...p, href: `/blog-posts/${p.slug}` });

/** All posts, in the order every listing shows them (home, /about and /blog alike). */
export const blogPosts: BlogPost[] = [
  post({
    slug: "the-ultimate-honeymoon-destination",
    title: "The Ultimate Honeymoon Destination",
    excerpt:
      "Experience the perfect romantic getaway with stunning beaches, misty hills, luxury stays, and unforgettable memories.",
    date: "September 7, 2025",
    heroDate: "07 Sep 2025",
    readingTime: "3 min read",
    image: { src: "/assets/6a461383af667aadb1948559_Couple-Image-1.webp" },
  }),
  post({
    slug: "family-friendly-destinations-that-everyone-will-love",
    title: "Family-Friendly Destinations That Everyone Will Love",
    excerpt:
      "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
    date: "September 7, 2025",
    heroDate: "07 Sep 2025",
    readingTime: "3 min read",
    image: { src: "/assets/6a6906707995be283ce08558_482bb97c283af3d87563adf063de29e9.jpg" },
  }),
  post({
    slug: "why-2026-is-the-best-year-for-travel-and-tour",
    title: "Why 2026 Is the Best Year for Travel and Tour",
    excerpt:
      "With new flight routes, improved global connections trending destinations, 2026 is shaping.",
    date: "September 16, 2025",
    heroDate: "16 Sep 2025",
    readingTime: "3 min read",
    image: {
      src: "/assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8.jpg",
      srcSet:
        "/assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8-p-500.jpg 500w, /assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8-p-800.jpg 800w, /assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8.jpg 1000w",
      sizes: "100vw",
    },
  }),
];
