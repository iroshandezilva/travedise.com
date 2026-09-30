import type { Metadata } from "next";

import { PillLink } from "@/components/v2/buttons";
import { FooterWide } from "@/components/v2/footer-wide";
import { PlainHero } from "@/components/v2/plain-hero";
import { QuestionList } from "@/components/v2/questions";
import { Section } from "@/components/v2/section";
import { faqHeading, faqPageFaqs } from "@/content/faqs";
import { questionsIntro } from "@/content/v2/shared";

const TITLE = "Questions — Travedise";
const DESCRIPTION = faqHeading.title;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** The questions page: the same answers as before, in the new page shell. */
export default function FaqPage() {
  const items = faqPageFaqs.map((item) => ({ q: item.question, a: item.answer }));

  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PlainHero title="Questions" body={faqHeading.title} current="/faq" />
      <main>
        <Section surface="cream" className="py-[90px] max-md:py-14">
          <div className="mx-auto flex w-full max-w-[820px] flex-col items-start gap-10">
            <QuestionList items={items} />
            <PillLink href={questionsIntro.href} variant="navy">
              {questionsIntro.action}
            </PillLink>
          </div>
        </Section>
      </main>
      <FooterWide statementFace="body" />
    </div>
  );
}
