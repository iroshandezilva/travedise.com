import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import type { BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";

export type BlogCardVariant = "section" | "listing";

/**
 * A blog post card: rounded photo with date + reading-time chips, then title, excerpt and
 * a "Read Article" pill. Hovering the card zooms the photo (Webflow "Packages Item
 * [Hover In/Out]": scale 1.1, 350ms linear); hovering the pill outlines it.
 *
 * - `section` — home and /about "Blog & Tips": serif title, clamped Inter Tight excerpt,
 *   pill pinned to the bottom of the 520px card.
 * - `listing` — /blog: sans title, larger excerpt, pill right under it.
 */
export function BlogCard({
  post,
  variant,
  className,
}: {
  post: BlogPost;
  variant: BlogCardVariant;
  className?: string;
}) {
  const section = variant === "section";
  return (
    <Link
      href={post.href}
      className={cn(
        "group flex h-[520px] max-w-full flex-col items-start gap-5 no-underline max-md:h-full max-md:gap-4",
        className,
      )}
    >
      <div className="relative w-full overflow-clip rounded-[20px]">
        <img
          src={post.image.src}
          srcSet={post.image.srcSet}
          sizes={post.image.sizes}
          alt={post.title}
          loading="lazy"
          className="h-[302px] w-full rounded-[20px] object-cover transition-transform duration-350 ease-linear group-hover:scale-110 max-lg:h-[250px] max-md:h-[300px]"
        />
        <div className="absolute top-5 left-5 flex items-center justify-center gap-2 text-[13px] text-white max-sm:top-2.5 max-sm:left-2.5 xl:gap-[15px] xl:text-[14px]">
          <div className="rounded-full bg-ink px-[15px] py-2 text-center">{post.date}</div>
          <div>{post.readingTime}</div>
        </div>
      </div>
      <div
        className={cn(
          "flex w-full flex-col items-start justify-between",
          section && "h-full max-lg:justify-start",
        )}
      >
        {section ? (
          <div className="flex flex-col items-start gap-2 pl-1">
            <div className="font-serif text-2xl/[118%] tracking-[0.3px] text-navy">
              {post.title}
            </div>
            <p className="m-0 max-h-12 overflow-auto font-heading tracking-[0.4px] text-slate">
              {post.excerpt}
            </p>
          </div>
        ) : (
          <>
            <div className="text-2xl/[150%] font-medium text-navy max-sm:text-[22px]">
              {post.title}
            </div>
            <p className="mt-2.5 mb-6 text-[18px]/[155%] text-slate max-md:mb-2.5 max-md:text-base/[155%]">
              {post.excerpt}
            </p>
          </>
        )}
        <span
          className={cn(
            "rounded-full border border-line bg-white px-[21px] py-[13px] text-navy hover:outline hover:outline-navy-800 max-md:py-2",
            section && "mt-5",
          )}
        >
          <span className="block h-6 overflow-clip">Read Article</span>
        </span>
      </div>
    </Link>
  );
}

const GRID =
  "grid-cols-[1fr_.8fr_.59fr] gap-6 max-lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-lg:gap-y-10 max-md:grid-cols-1 max-md:gap-10";

/** The three-column blog grid (widest card first) used by every listing. Cards reveal on scroll. */
export function BlogCardGrid({
  posts,
  variant,
  reveal = true,
  className,
}: {
  posts: BlogPost[];
  variant: BlogCardVariant;
  reveal?: boolean;
  className?: string;
}) {
  return (
    <div role="list" className={cn("grid w-full", GRID, className)}>
      {posts.map((post) =>
        reveal ? (
          <Reveal key={post.slug} role="listitem" delay={100}>
            <BlogCard post={post} variant={variant} />
          </Reveal>
        ) : (
          <div key={post.slug} role="listitem">
            <BlogCard post={post} variant={variant} />
          </div>
        ),
      )}
    </div>
  );
}
