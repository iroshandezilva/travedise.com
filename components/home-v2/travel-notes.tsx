import Link from "next/link";

import { featuredNote, secondaryNotes } from "@/content/home-v2";

/**
 * One large note beside two smaller ones. A grid, because "Explore all notes" sits
 * beside the heading on desktop and after the notes on a phone.
 */
export function TravelNotes() {
  return (
    <section id="notes" className="w-full shrink-0 bg-white py-[77px] gutter-v2 max-md:py-14">
      <div className="container-v2 grid grid-cols-[1fr_auto] items-end gap-x-8 gap-y-9 max-md:grid-cols-1 max-md:gap-y-[26px]">
        <h2 className="col-start-1 row-start-1 m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[30px]/[38px]">
          Useful reading for the way there.
        </h2>
        <Link
          href="/blog"
          className="col-start-2 row-start-1 justify-self-end border-b border-v2-navy pb-[7px] text-[16px]/[1.2] text-v2-navy max-md:col-start-1 max-md:row-start-3 max-md:justify-self-start max-md:border-0 max-md:pb-0 max-md:text-[15px]/[20px] max-md:text-[#126a8f]"
        >
          Explore all notes ↗
        </Link>

        <div className="col-span-2 col-start-1 row-start-2 grid grid-cols-2 gap-9 max-lg:grid-cols-1 max-md:col-span-1 max-md:gap-[26px]">
          <Link href={featuredNote.href} className="group flex flex-col gap-3">
            <div className="overflow-hidden">
              <img
                src={featuredNote.image}
                alt=""
                loading="lazy"
                className="block h-[410px] w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] max-md:h-[220px]"
              />
            </div>
            <span className="font-soul text-[30px]/[38px] font-medium text-v2-navy max-md:text-[23px]/[30px]">
              {featuredNote.title}
            </span>
            <span className="text-[16px]/[24px] text-v2-navy max-md:text-[15px]/[23px] max-md:text-v2-body">
              {featuredNote.body}
            </span>
          </Link>

          <div className="flex flex-col gap-5 max-md:gap-[26px]">
            {secondaryNotes.map((note) => (
              <Link
                key={note.title}
                href={note.href}
                className="flex gap-[18px] pt-[18px] max-md:gap-3.5 max-md:pt-0"
              >
                <img
                  src={note.image}
                  alt=""
                  loading="lazy"
                  className="block h-[180px] w-[210px] shrink-0 object-cover max-md:size-[110px]"
                />
                <span className="flex flex-col gap-2.5 max-md:gap-1.5">
                  <span className="font-soul text-[25px]/[31px] font-medium text-v2-navy max-md:text-[18px]/[24px]">
                    {note.title}
                  </span>
                  <span className="text-[15px]/[22px] text-v2-navy max-md:text-[14px]/[21px] max-md:text-v2-body">
                    {note.body}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
