import { BlogPostShareBar } from "@/components/site/blog-post-share-bar";
import { Footer } from "@/components/site/footer";
import { PageGradient } from "@/components/site/page-gradient";

// The preview layout pads <main> by 40px; page chrome is full-bleed, so undo that.
const bleed = "-mx-10 self-stretch";

export default function FooterPreview() {
  return (
    <>
      <PageGradient />
      <h1 className="text-h4">Page chrome</h1>

      <section data-test="share-bar" className={bleed}>
        <div className="container-site">
          <BlogPostShareBar />
        </div>
      </section>

      {/* As on /faq: the FAQ link is current. */}
      <div data-test="footer-faq" className={bleed}>
        <Footer currentPath="/faq" />
      </div>

      {/* As on /: the Home link (and logo) are current. */}
      <div data-test="footer-home" className={bleed}>
        <Footer currentPath="/" />
      </div>

      {/* Auto-detected route (/preview/footer): nothing is current. */}
      <div data-test="footer-auto" className={`${bleed} -mb-10`}>
        <Footer />
      </div>
    </>
  );
}
