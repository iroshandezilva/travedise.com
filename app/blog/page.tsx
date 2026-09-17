import type { Metadata } from "next";

import { BlogCardGrid } from "@/components/site/blog-card";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { blogPosts } from "@/content/blog";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/blog" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Blog - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Blog - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function BlogPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar current="/blog" />
      <main>
        <section>
          <div className="container-site">
            <div className="flex flex-col items-center justify-center gap-20 pt-[230px] pb-20 max-lg:gap-[60px] max-lg:pt-[140px] max-md:gap-[30px] max-md:pt-[120px] max-md:pb-[60px] max-sm:pt-[100px]">
              <div className="flex max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
                <Reveal delay={50}>
                  <SectionTag>Blog & Tips</SectionTag>
                </Reveal>
                <Reveal as="h2" delay={100} className="m-0 text-center font-serif">
                  Expert travel advice to help you explore smarter and deeper.
                </Reveal>
              </div>
              <div className="w-full border-b border-line pb-20 max-lg:pb-[50px] max-md:pb-10">
                <BlogCardGrid posts={blogPosts} variant="listing" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
