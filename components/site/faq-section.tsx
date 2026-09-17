import type { ReactNode } from "react";

import { FaqAccordion } from "@/components/site/faq-accordion";
import { PillButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { faqHeading, type Faq } from "@/content/faqs";
import { cn } from "@/lib/cn";

const VARIANTS = {
  // `section.faq-section` — grey rounded panel on `/`, `/packages` and `/packages/*`.
  section: {
    section: "mx-2.5 mt-2.5 rounded-panel bg-surface",
    wrapper: "gap-15 py-20 max-lg:gap-10 max-md:gap-7.5 max-md:py-15",
    title: "max-lg:text-[40px] max-md:text-[32px]",
  },
  // The `/faq` page body (`.update-faq-wrapper`): no panel, room for the transparent navbar,
  // regular h2 sizes, bordered cards.
  page: {
    section: "",
    wrapper:
      "gap-15 pt-[230px] pb-[120px] max-lg:pt-[140px] max-lg:pb-20 max-md:gap-7.5 max-md:pt-[120px] max-md:pb-15 max-sm:pt-[100px]",
    title: "",
  },
};

export type FaqSectionProps = {
  items: Faq[];
  variant?: keyof typeof VARIANTS;
  tag?: ReactNode;
  title?: ReactNode;
  /** The button under the list; `null` hides it. */
  cta?: { href: string; label: string } | null;
  /** Indices of items that start open. */
  defaultOpen?: number[];
  className?: string;
};

/** "FAQ — Everything you need to know…" heading, the accordion list and the contact button. */
export function FaqSection({
  items,
  variant = "section",
  tag = faqHeading.tag,
  title = faqHeading.title,
  cta = { href: "/contact", label: "Contact Travel Expert" },
  defaultOpen,
  className,
}: FaqSectionProps) {
  const v = VARIANTS[variant];
  return (
    <section className={cn(v.section, className)}>
      <div className="container-site">
        <div className={cn("flex w-full flex-col items-center justify-center", v.wrapper)}>
          <div className="mx-auto flex w-full max-w-[713px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
            <Reveal delay={50}>
              <SectionTag>{tag}</SectionTag>
            </Reveal>
            <Reveal as="h2" delay={100} className={cn("text-center font-serif", v.title)}>
              {title}
            </Reveal>
          </div>
          <FaqAccordion items={items} bordered={variant === "page"} defaultOpen={defaultOpen} />
          {cta && <PillButton href={cta.href}>{cta.label}</PillButton>}
        </div>
      </div>
    </section>
  );
}
