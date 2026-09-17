"use client";

import Link from "next/link";
import { useState } from "react";

import { questions } from "@/content/home-v2";

/**
 * Practical questions, with the first answer open and one answer showing at a time.
 * A grid, because the call to action sits under the intro on desktop but below the
 * whole list on a phone.
 */
export function Questions() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="questions"
      className="w-full shrink-0 bg-v2-cream py-[78px] gutter-v2 max-md:py-14"
    >
      <div className="container-v2 grid grid-cols-[410px_1fr] gap-x-20 gap-y-[25px] max-lg:grid-cols-1 max-lg:gap-y-10 max-md:gap-y-6">
        <div className="col-start-1 row-start-1 flex flex-col items-start gap-[25px] max-md:gap-6">
          <h2 className="m-0 font-soul text-[45px]/[52px] font-medium text-v2-navy max-md:text-[30px]/[38px]">
            Before the journey begins.
          </h2>
          <p className="m-0 text-[17px]/[26px] text-v2-navy max-md:text-[15px]/[24px] max-md:text-[#485055]">
            A few practical questions are worth settling early. We can talk through the rest
            together.
          </p>
        </div>

        <div className="col-start-2 row-span-2 row-start-1 flex min-w-0 flex-col max-lg:col-start-1 max-lg:row-span-1 max-lg:row-start-2">
          {questions.map((item, i) => {
            const expanded = i === open;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`v2-faq-${i}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className="flex w-full justify-between gap-5 border-0 bg-none py-[19px] text-left max-md:items-start max-md:gap-4 max-md:py-4"
                >
                  <span className="text-[17px]/[25px] text-v2-navy max-md:text-[16px]/[24px]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="text-[22px]/[25px] text-v2-navy max-md:text-[20px]/[24px]"
                  >
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                {expanded && (
                  <div id={`v2-faq-${i}`} className="pr-10 pb-5 max-md:pr-0 max-md:pb-[18px]">
                    <p className="m-0 text-[15px]/[24px] text-v2-navy max-md:text-[14px]/[23px] max-md:text-v2-body">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="col-start-1 row-start-2 self-start justify-self-start rounded-[40px] bg-v2-navy px-6 py-4 text-[16px]/[1.2] text-white max-lg:row-start-3 max-md:flex max-md:h-[52px] max-md:items-center max-md:justify-center max-md:justify-self-stretch max-md:rounded-[26px] max-md:px-0 max-md:py-0 max-md:text-[15px]"
        >
          Talk to a travel designer ↗
        </Link>
      </div>
    </section>
  );
}
