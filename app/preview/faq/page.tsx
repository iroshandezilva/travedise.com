import { FaqSection } from "@/components/site/faq-section";
import { faqPageFaqs, siteFaqs } from "@/content/faqs";

// Full-bleed wrappers cancel the preview layout's 40px padding so widths match the real pages.
const bleed = "-mx-10 self-stretch";

export default function FaqPreview() {
  return (
    <>
      <div data-test="faq-section" className={bleed}>
        <FaqSection items={siteFaqs} />
      </div>
      <div data-test="faq-page" className={bleed}>
        <FaqSection items={faqPageFaqs} variant="page" />
      </div>
      <div data-test="faq-section-open" className={bleed}>
        <FaqSection items={siteFaqs} defaultOpen={[0]} />
      </div>
      <div data-test="faq-page-open" className={bleed}>
        <FaqSection items={faqPageFaqs} variant="page" defaultOpen={[0]} />
      </div>
    </>
  );
}
