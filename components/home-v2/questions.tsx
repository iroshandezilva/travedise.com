"use client";

import Link from "next/link";
import { useState } from "react";

import { questions } from "@/content/home-v2";

/** Practical questions, with the first answer open. One answer shows at a time. */
export function Questions() {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full shrink-0 bg-v2-cream py-[78px] gutter-v2 max-md:py-14">
      <div className="container-v2 flex gap-20 max-lg:flex-col max-lg:gap-10">
        <div className="flex w-[410px] shrink-0 flex-col items-start gap-[25px] max-lg:w-full">
          <h2 className="m-0 font-soul text-[45px]/[52px] font-medium text-v2-navy max-md:text-[32px]/[40px]">
            Before the journey begins.
          </h2>
          <p className="m-0 text-[17px]/[26px] text-v2-navy">
            A few practical questions are worth settling early. We can talk through the rest
            together.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-[40px] bg-v2-navy px-6 py-4 text-[16px]/[1.2] text-white"
          >
            Talk to a travel designer ↗
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {questions.map((item, i) => {
            const expanded = i === open;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`v2-faq-${i}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className="flex w-full justify-between gap-5 border-0 bg-none py-[19px] text-left"
                >
                  <span className="text-[17px]/[25px] text-v2-navy">{item.q}</span>
                  <span aria-hidden className="text-[22px]/[25px] text-v2-navy">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                {expanded && (
                  <div id={`v2-faq-${i}`} className="pr-10 pb-5 max-md:pr-0">
                    <p className="m-0 text-[15px]/[24px] text-v2-navy">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
