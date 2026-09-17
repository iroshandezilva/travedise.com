import Link from "next/link";
import type { ReactNode } from "react";

import { overviewLede, overviewNotes, placeLinks } from "@/content/home-v2";

/** Splits `…in [Yala], elephants…` into text and links, using the `placeLinks` map. */
function withPlaceLinks(body: string): ReactNode[] {
  return body.split(/\[([^\]]+)\]/).map((part, i) => {
    // Odd indexes are what was inside the brackets.
    if (i % 2 === 0) return part;
    const href = placeLinks[part];
    if (!href) return part;
    return (
      <Link
        key={`${part}-${i}`}
        href={href}
        className="text-v2-navy underline decoration-v2-navy/35 decoration-1 underline-offset-[3px]"
      >
        {part}
      </Link>
    );
  });
}

/** Two columns: a large statement about the island, and four notes on what it offers. */
export function Overview() {
  return (
    <section id="overview" className="w-full shrink-0 bg-white py-24 gutter-v2 max-md:py-16">
      <div className="container-v2 flex items-start gap-24 max-lg:flex-col max-lg:gap-12">
        <p className="m-0 w-[620px] shrink-0 font-soul text-[40px]/[52px] tracking-[-0.01em] text-v2-navy max-lg:w-full max-lg:text-[32px]/[42px] max-md:text-[26px]/[36px]">
          {overviewLede}
        </p>
        <div className="flex min-w-0 flex-1 flex-col gap-[22px]">
          <h2 className="m-0 mb-0.5 font-soul text-[24px]/[30px] font-normal text-v2-navy">
            What people come back talking about
          </h2>
          {overviewNotes.map((note) => (
            <p key={note.lead} className="m-0 text-[16px]/[26px] text-[#3a424a]">
              <strong className="font-semibold text-v2-navy">{note.lead}</strong>{" "}
              {withPlaceLinks(note.body)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
