import { Reveal } from "@/components/ui/reveal";
import type { BlogImage } from "@/content/blog-posts";

const ICON = {
  author: "/assets/69c38c90a6a389dfc58352e5_circle-user.png",
  date: "/assets/69c38c90a6a389dfc58352e6_calendar-lines.png",
};

/**
 * Full-height navy hero of a blog post (Webflow `.blog-single-hero-section`): a white-gradient
 * Boska title over an optional photo, then author and date. Shrinks to its content at ≤991px.
 *
 * The CMS has no hero photos and no authors, so on the live posts the hero is a plain
 * navy gradient and the author slot shows just its icon — kept as-is to match.
 */
export function BlogPostHero({
  title,
  date,
  author,
  image,
}: {
  title: string;
  date: string;
  author?: string;
  image?: BlogImage;
}) {
  return (
    <section className="relative h-screen w-full max-lg:h-auto">
      {image && (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          alt={image.alt ?? ""}
          className="absolute inset-0 size-full max-w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#09173333_12.02%,var(--color-navy))]" />
      <div className="container-site flex h-full items-start justify-center">
        <div className="relative mx-auto flex h-full w-full max-w-[700px] flex-col items-center justify-end gap-6 pb-[100px] max-lg:pt-[250px] max-md:pb-[60px] max-sm:gap-4 max-sm:pt-[140px] max-sm:pb-10">
          <Reveal
            as="h2"
            delay={50}
            className="m-0 bg-[linear-gradient(106deg,var(--color-white)_38.68%,#ffffffd9_72.6%)] bg-clip-text text-center font-boska text-transparent"
          >
            {title}
          </Reveal>
          <div className="flex items-center justify-center gap-5">
            <Reveal delay={100} className="flex items-center gap-2">
              <img src={ICON.author} alt="" className="block w-5" />
              {author && <div className="text-white">{author}</div>}
            </Reveal>
            <Reveal delay={200} className="flex items-center gap-2">
              <img src={ICON.date} alt="" className="block w-5" />
              <div className="text-white">{date}</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
