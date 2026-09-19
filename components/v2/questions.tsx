"use client";

import { PillLink } from "@/components/v2/buttons";
import { questions, questionsIntro } from "@/content/v2/shared";

import { AccordionRow, useAccordion } from "./accordion";

/**
 * "Before the journey begins" — the same questions on the home page and on every
 * package page, so a reader gets one answer to a question, not two.
 *
 * A grid, because the call to action sits under the intro on desktop but below the
 * whole list on a phone.
 */
export function Questions({ items = questions }: { items?: { q: string; a: string }[] }) {
  const acc = useAccordion(0);

  return (
    <section
      id="questions"
      className="w-full shrink-0 bg-v2-cream py-[78px] gutter-v2 max-md:py-14"
    >
      <div className="container-v2 grid grid-cols-[410px_1fr] gap-x-20 gap-y-[25px] max-lg:grid-cols-1 max-lg:gap-y-10 max-md:gap-y-6">
        <div className="col-start-1 row-start-1 flex flex-col items-start gap-[25px] max-md:gap-6">
          <h2 className="m-0 font-display text-[45px]/[52px] font-medium text-v2-navy max-md:text-[30px]/[38px]">
            {questionsIntro.heading}
          </h2>
          <p className="m-0 text-[17px]/[26px] text-v2-navy max-md:text-[15px]/[24px] max-md:text-[#485055]">
            {questionsIntro.body}
          </p>
        </div>

        <div className="col-start-2 row-span-2 row-start-1 flex min-w-0 flex-col max-lg:col-start-1 max-lg:row-span-1 max-lg:row-start-2">
          {items.map((item, i) => (
            <AccordionRow
              key={item.q}
              open={acc.isOpen(i)}
              onToggle={() => acc.toggle(i)}
              buttonClassName="gap-5 py-[19px] max-md:items-start max-md:py-4"
              panelClassName="pr-10 pb-5 max-md:pr-0 max-md:pb-[18px]"
              head={
                <span className="text-[17px]/[25px] text-v2-navy max-md:text-[16px]/[24px]">
                  {item.q}
                </span>
              }
            >
              <p className="m-0 text-[15px]/[24px] text-v2-navy max-md:text-[14px]/[23px] max-md:text-v2-body">
                {item.a}
              </p>
            </AccordionRow>
          ))}
        </div>

        <PillLink
          href={questionsIntro.href}
          variant="navy"
          className="col-start-1 row-start-2 h-auto self-start justify-self-start rounded-[40px] px-6 py-4 text-[16px]/[1.2] font-normal max-lg:row-start-3 max-md:h-[52px] max-md:justify-self-stretch max-md:rounded-[26px] max-md:px-0 max-md:py-0 max-md:text-[15px]"
        >
          {questionsIntro.action}
        </PillLink>
      </div>
    </section>
  );
}
