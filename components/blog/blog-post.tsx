import { BlogPostShareBar } from "@/components/site/blog-post-share-bar";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts, type BlogSlug } from "@/content/blog";
import { blogPostBodies } from "@/content/blog-posts";

import { BlogPostHero } from "./blog-post-hero";
import { BlogPromoCard } from "./blog-promo-card";
import { RichText } from "./rich-text";

/**
 * A whole blog post page: transparent navbar, hero, the body fields with a photo and tour
 * teaser between them, the back/share bar and the footer. Card data comes from
 * `content/blog.ts`, the body from `content/blog-posts/<slug>.ts`.
 */
export function BlogPost({ slug }: { slug: BlogSlug }) {
  const post = blogPosts.find((p) => p.slug === slug)!;
  const { details, figure, tips, closing } = blogPostBodies[slug];

  return (
    <div className="overflow-clip pb-2.5">
      <Navbar variant="transparent" />
      <BlogPostHero title={post.title} date={post.heroDate} />
      <section>
        <div className="container-site">
          <div className="flex flex-col items-center justify-center pt-[50px] pb-[120px] max-lg:pb-20 max-md:pb-[60px] max-sm:pt-[30px]">
            <RichText blocks={details} variant="details" />
            <Reveal
              delay={100}
              className="mx-auto my-[50px] flex w-full max-w-[818px] flex-col items-center justify-center gap-[15px] max-md:my-[30px]"
            >
              {figure.image && (
                <img
                  src={figure.image.src}
                  srcSet={figure.image.srcSet}
                  sizes={figure.image.sizes}
                  alt={figure.image.alt ?? figure.caption}
                  loading="lazy"
                  className="block w-full max-w-full rounded-[20px] max-sm:rounded-2xl"
                />
              )}
              <div className="text-sm/[143%]">{figure.caption}</div>
            </Reveal>
            {tips && <RichText blocks={tips} variant="tips" />}
            <BlogPromoCard />
            {closing && <RichText blocks={closing} variant="closing" />}
            <BlogPostShareBar />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
