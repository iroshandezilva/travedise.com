import { BlogCardGrid } from "@/components/site/blog-card";
import { BlogSection } from "@/components/site/blog-section";
import { PackageCardGrid } from "@/components/site/package-card";
import { blogPosts } from "@/content/blog";
import { packageTabs, packagesFor } from "@/content/packages";

const bleed = "-mx-10 self-stretch";

export default function CardsPreview() {
  return (
    <>
      {/* Home "Travel Packages" grid (reference: section.packages-section .collection-list-packages) */}
      <div data-test="home-packages" className={bleed}>
        <div className="container-site">
          <PackageCardGrid packages={packagesFor("home")} layout="home" />
        </div>
      </div>

      {/* /packages tabs (reference: .packages-collection-list inside .small-container) */}
      {packageTabs.map((tab) => (
        <div key={tab.label} data-test={`packages-tab-${tab.category ?? "all"}`} className={bleed}>
          <div className="container-site max-w-[1086px]">
            <h6 className="mb-4">{tab.label}</h6>
            <PackageCardGrid
              packages={packagesFor("packagesPage", tab.category)}
              layout="listing"
              reveal={!tab.category}
            />
          </div>
        </div>
      ))}

      {/* Home + /about "Blog & Tips" (reference: section.blog-section) */}
      <div data-test="blog-section" className={bleed}>
        <BlogSection />
      </div>

      {/* /blog listing (reference: section.accommodations-section .collection-list-blogs) */}
      <div data-test="blog-listing" className={bleed}>
        <div className="container-site">
          <BlogCardGrid posts={blogPosts} variant="listing" />
        </div>
      </div>
    </>
  );
}
