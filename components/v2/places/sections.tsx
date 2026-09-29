import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/v2/section";
import { islandPath, journeys } from "@/content/v2/journeys";
import { placeBySlug, places, regionByKey, type Place } from "@/content/v2/places";
import { levelLabels, months, type Level } from "@/content/v2/when-to-go";
import { cn } from "@/lib/cn";

const heading =
  "m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]";

/** The story of the place beside a small map of where it sits. */
export function PlaceIntro({ place }: { place: Place }) {
  return (
    <Section className="py-[110px] max-md:py-14">
      <div className="flex items-start gap-[100px] max-lg:flex-col max-lg:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-7 max-md:gap-5">
          <h2 className={cn(heading, "max-w-[620px]")}>{place.intro.heading}</h2>
          {place.intro.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="m-0 text-[18px]/[29px] text-[#344458] max-md:text-[16px]/[26px]"
            >
              {p}
            </p>
          ))}
        </div>
        <figure className="m-0 flex w-[420px] shrink-0 flex-col gap-3.5 bg-v2-cream px-7 pt-7 pb-[22px] max-lg:w-full max-lg:max-w-[480px] max-md:px-5 max-md:pt-5">
          <LocatorMap place={place} />
          <figcaption className="text-[14px]/[21px] text-[#65788c]">{place.mapCaption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}

/** The island with this place marked, and every other place as a faint dot. */
function LocatorMap({ place }: { place: Place }) {
  const { cx, cy } = place.map;
  const anchor = place.locatorAnchor ?? place.map.anchor;
  const label =
    anchor === "end"
      ? { x: cx - 22, y: cy + 6 }
      : anchor === "start"
        ? { x: cx + 22, y: cy + 6 }
        : { x: cx, y: cy > 500 ? cy + 36 : cy - 24 };

  return (
    <svg
      viewBox="-10 -10 420 690"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Map of Sri Lanka with ${place.name} marked, in the ${regionByKey[place.region].name}`}
      className="block h-[420px] w-full max-md:h-[340px]"
    >
      <path d={islandPath} fill="#fff" stroke="rgba(16,27,46,0.3)" strokeWidth="1.4" />
      {places
        .filter((p) => p.slug !== place.slug)
        .map((p) => (
          <circle key={p.slug} cx={p.map.cx} cy={p.map.cy} r="3" fill="rgba(16,27,46,0.22)" />
        ))}
      <circle cx={cx} cy={cy} r="16" fill="var(--color-v2-sky)" opacity="0.25" />
      <circle cx={cx} cy={cy} r="7" fill="var(--color-v2-sky)" stroke="#101b2e" strokeWidth="2" />
      <text
        x={label.x}
        y={label.y}
        textAnchor={anchor}
        fontSize="18"
        fontWeight="600"
        fill="#101b2e"
        className="font-heading"
      >
        {place.name}
      </text>
    </svg>
  );
}

/** Four numbered things we do there, then a wide photo and a narrow one. */
export function PlaceDoing({ place }: { place: Place }) {
  return (
    <Section className="pb-[110px] max-md:pb-14">
      <div className="flex flex-col gap-12 max-md:gap-8">
        <div className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-4">
          <h2 className={heading}>How we spend the time there.</h2>
          <p className="m-0 w-[380px] shrink-0 text-[16px]/[25px] text-[#52687b] max-lg:w-full max-md:text-[15px]/[24px]">
            {place.doing.lede}
          </p>
        </div>

        <ol className="m-0 grid list-none grid-cols-4 gap-8 p-0 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-6">
          {place.doing.items.map((item, i) => (
            <Reveal
              as="li"
              from="rise"
              delay={i * 70}
              key={item.title}
              className="flex flex-col gap-3.5 border-t border-v2-navy/16 pt-6 max-md:gap-2.5 max-md:pt-5"
            >
              <div className="text-[14px]/[20px] text-[#65788c]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="m-0 text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[20px]/[28px]">
                {item.title}
              </h3>
              <p className="m-0 text-[15px]/[24px] text-[#52687b]">{item.body}</p>
            </Reveal>
          ))}
        </ol>

        {place.gallery && (
          <div className="mt-4 grid grid-cols-3 gap-3.5 max-md:mt-0 max-md:grid-cols-1 max-md:gap-2.5">
            {place.gallery.map((shot, i) => (
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className={cn(
                  "block h-[500px] w-full object-cover max-lg:h-[380px] max-md:h-[260px]",
                  i === 0 && "col-span-2 max-md:col-span-1",
                )}
                style={{ objectPosition: shot.position }}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

const cell: Record<Level, string> = {
  3: "bg-v2-navy",
  2: "bg-v2-sand",
  1: "bg-[#e9e6de]",
};

/** Twelve months as a strip of cells, from the region's row in the month guide. */
export function PlaceSeasons({ place }: { place: Place }) {
  const ratings = regionByKey[place.region].ratings;
  return (
    <Section surface="cream" className="py-[100px] max-md:py-14">
      <div className="flex flex-col gap-10 max-md:gap-7">
        <div className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-5">
          <div className="flex flex-col gap-3.5">
            <h2 className={heading}>When to go.</h2>
            <p className="m-0 max-w-[640px] text-[16px]/[25px] text-[#52687b] max-md:text-[15px]/[24px]">
              {place.season}
            </p>
          </div>
          <ul className="m-0 flex shrink-0 list-none flex-wrap gap-[22px] p-0 max-md:gap-x-4 max-md:gap-y-2">
            {([3, 2, 1] as const).map((level) => (
              <li key={level} className="flex items-center gap-2 text-[14px] text-[#52687b]">
                <span
                  aria-hidden
                  className={cn("size-3.5", cell[level], level === 1 && "border border-v2-navy/12")}
                />
                {levelLabels[level]}
              </li>
            ))}
          </ul>
        </div>

        <Reveal
          as="ol"
          from="fade"
          className="m-0 grid list-none grid-cols-12 gap-1.5 p-0 max-md:gap-[3px]"
        >
          {months.map((m, i) => (
            <li key={m.name} className="flex flex-col gap-2.5 max-md:gap-2">
              <div
                title={`${m.name}: ${levelLabels[ratings[i]]}`}
                className={cn("h-14 max-md:h-9", cell[ratings[i]])}
              />
              <div className="text-[14px]/[20px] text-[#52687b] max-md:text-center max-md:text-[12px]/[16px]">
                <span aria-hidden className="max-md:hidden">
                  {m.name.slice(0, 3)}
                </span>
                <span aria-hidden className="hidden max-md:inline">
                  {m.name[0]}
                </span>
                <span className="sr-only">
                  {m.name}: {levelLabels[ratings[i]]}
                </span>
              </div>
            </li>
          ))}
        </Reveal>

        <Link
          href="/when-to-go"
          className="inline-flex items-center gap-2.5 self-start text-[16px]/[1.2] text-v2-navy underline-offset-4 hover:underline"
        >
          The full month guide <span aria-hidden>↗</span>
        </Link>
      </div>
    </Section>
  );
}

/**
 * The journeys that stop here — those ending here first. A place none of our routes
 * stops at borrows the journeys that stop elsewhere in its region, under a heading that
 * says so; if there are none of those either, the section is left out.
 */
export function PlaceJourneys({ place }: { place: Place }) {
  const direct = place.journeyStop
    ? journeys.filter((j) => j.stops.includes(place.journeyStop!))
    : [];
  const stopsInRegion = places
    .filter((p) => p.region === place.region && p.journeyStop)
    .map((p) => p.journeyStop!);
  const matches = direct.length
    ? [...direct].sort(
        (a, b) =>
          Number(b.stops.at(-1) === place.journeyStop) -
          Number(a.stops.at(-1) === place.journeyStop),
      )
    : journeys.filter((j) => j.stops.some((s) => stopsInRegion.includes(s)));
  if (!matches.length) return null;

  const title = direct.length
    ? (place.journeysHeading ?? `Journeys through ${place.name}.`)
    : "Journeys that pass close by.";

  return (
    <Section className="py-[110px] max-md:py-14">
      <div className="flex flex-col gap-11 max-md:gap-7">
        <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-3">
          <h2 className={heading}>{title}</h2>
          <Link
            href="/packages"
            className="inline-block shrink-0 text-[16px]/[1.2] text-v2-navy underline-offset-4 hover:underline"
          >
            All journeys ↗
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-md:gap-5">
          {matches.slice(0, 4).map((j) => (
            <Link
              key={j.key}
              href={j.href}
              className="group flex items-stretch bg-v2-cream max-md:flex-col"
            >
              <div className="w-[240px] shrink-0 overflow-clip max-md:h-[200px] max-md:w-full">
                <img
                  src={j.image}
                  alt={j.alt}
                  loading="lazy"
                  className="v2-card-img block size-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-7 pt-7 pb-[26px] max-md:px-5 max-md:pt-5 max-md:pb-5">
                <div className="text-[14px]/[20px] text-[#65788c]">{j.theme}</div>
                <h3 className="m-0 text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-navy transition-colors duration-300 group-hover:text-[#344458] max-md:text-[21px]/[28px]">
                  {j.name}
                </h3>
                <p className="m-0 text-[14px]/[21px] text-[#52687b]">{j.route}</p>
                <div className="mt-auto flex items-center justify-between gap-[18px] pt-3.5">
                  <div className="text-[15px]/[22px] text-v2-navy">
                    <span className="font-semibold">{j.price}</span> · {j.nights}
                  </div>
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-v2-navy/25 text-[15px] text-v2-navy transition-colors duration-200 group-hover:border-v2-navy group-hover:bg-v2-navy group-hover:text-white"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Three places we pair with this one. */
export function PlaceNearby({ place }: { place: Place }) {
  return (
    <Section surface="cream" className="py-[100px] max-md:py-14">
      <div className="flex flex-col gap-10 max-md:gap-7">
        <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-3">
          <h2 className={heading}>{place.nearby.heading}</h2>
          <Link
            href="/places"
            className="inline-block shrink-0 text-[16px]/[1.2] text-v2-navy underline-offset-4 hover:underline"
          >
            All places ↗
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
          {place.nearby.slugs.map((slug) => {
            const p = placeBySlug[slug];
            return (
              <Link key={slug} href={`/places/${slug}`} className="group flex flex-col bg-white">
                <div className="h-[260px] w-full overflow-clip max-md:h-[220px]">
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    loading="lazy"
                    className="v2-card-img block size-full object-cover"
                    style={{ objectPosition: p.image.position }}
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-[26px] pt-6 pb-[26px] max-md:px-5 max-md:pt-5 max-md:pb-6">
                  <h3 className="m-0 font-display text-[28px]/[34px] font-medium tracking-[-0.005em] text-v2-navy transition-colors duration-300 group-hover:text-[#344458] max-md:text-[24px]/[30px]">
                    {p.name}
                  </h3>
                  <p className="m-0 text-[15px]/[24px] text-[#52687b]">{p.line}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
