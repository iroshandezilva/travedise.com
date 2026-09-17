import Link from "next/link";

import { featuredNote, secondaryNotes } from "@/content/home-v2";

/** One large note beside two smaller ones. */
export function TravelNotes() {
  return (
    <section id="notes" className="w-full shrink-0 bg-white py-[77px] gutter-v2 max-md:py-14">
      <div className="container-v2 flex flex-col gap-9">
        <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-5">
          <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[32px]/[40px]">
            Useful reading for the way there.
          </h2>
          <Link
            href="/blog"
            className="inline-block border-b border-v2-navy pb-[7px] text-[16px]/[1.2] text-v2-navy"
          >
            Explore all notes ↗
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-9 max-lg:grid-cols-1">
          <Link href={featuredNote.href} className="group flex flex-col gap-3">
            <div className="overflow-hidden">
              <img
                src={featuredNote.image}
                alt=""
                loading="lazy"
                className="block h-[410px] w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
              />
            </div>
            <span className="font-soul text-[30px]/[38px] font-medium text-v2-navy max-md:text-[24px]/[32px]">
              {featuredNote.title}
            </span>
            <span className="text-[16px]/[24px] text-v2-navy">{featuredNote.body}</span>
          </Link>

          <div className="flex flex-col gap-5">
            {secondaryNotes.map((note) => (
              <Link
                key={note.title}
                href={note.href}
                className="flex gap-[18px] pt-[18px] max-sm:flex-col"
              >
                <img
                  src={note.image}
                  alt=""
                  loading="lazy"
                  className="block h-[180px] w-[210px] shrink-0 object-cover max-sm:w-full"
                />
                <span className="flex flex-col gap-2.5">
                  <span className="font-soul text-[25px]/[31px] font-medium text-v2-navy">
                    {note.title}
                  </span>
                  <span className="text-[15px]/[22px] text-v2-navy">{note.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
