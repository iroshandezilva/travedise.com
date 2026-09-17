import { BlogCardGrid } from "@/components/site/blog-card";
import { PillButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { blogPosts, type BlogPost } from "@/content/blog";

/** "Blog & Tips" — the latest posts and a link to /blog. Identical on the home page and /about. */
export function BlogSection({ posts = blogPosts }: { posts?: BlogPost[] }) {
  return (
    <section>
      <div className="container-site">
        <div className="flex flex-col items-center justify-center gap-20 py-[120px] max-lg:gap-10 max-lg:py-20 max-md:gap-[30px] max-md:py-[60px]">
          <div className="flex max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
            <Reveal delay={50}>
              <SectionTag>Blog & Tips</SectionTag>
            </Reveal>
            <Reveal
              as="h2"
              delay={100}
              className="m-0 text-center font-serif text-[48px]/[112%] max-lg:text-[40px] max-md:text-[32px]"
            >
              Expert travel advice to help you explore smarter and deeper.
            </Reveal>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[60px] max-md:gap-10">
            <BlogCardGrid posts={posts} variant="section" />
            <PillButton href="/blog">Read More Blogs</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
