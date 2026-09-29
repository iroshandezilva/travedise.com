import Link from "next/link";

import { HeroScrim, SiteNav } from "@/components/v2/site-nav";
import { regionByKey, placesHero, type Place } from "@/content/v2/places";

const SCRIM =
  "linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.86) 0%, oklab(0 0 0 / 0) 62%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)";

/** The places index hero: one photo, the title and a line. */
export function PlacesHero() {
  return (
    <header className="relative h-[560px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-[500px] max-md:h-[460px]">
      <img
        src={placesHero.image}
        alt={placesHero.alt}
        className="absolute inset-0 block size-full object-cover object-[50%_22%]"
      />
      <HeroScrim desktop={SCRIM} />

      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <SiteNav current="/places" />
        <div className="absolute inset-x-0 bottom-[58px] flex max-w-[820px] flex-col gap-[18px] max-md:bottom-8 max-md:gap-3">
          <h1 className="m-0 font-display text-[60px]/[66px] font-medium tracking-[-0.01em] text-white max-lg:text-[48px]/[54px] max-md:text-[34px]/[40px]">
            {placesHero.title}
          </h1>
          <p className="m-0 max-w-[660px] text-[19px]/[29px] text-[#e8eef1] transition-[opacity,translate] duration-[600ms] ease-out-quint motion-reduce:transition-none starting:translate-y-3 starting:opacity-0 max-md:text-[15px]/[24px]">
            {placesHero.body}
          </p>
        </div>
      </div>
    </header>
  );
}

/**
 * A place's hero: breadcrumb, the name set large, a line, and a glass strip of three
 * facts — when it is at its best, how long we give it, and who it suits.
 */
export function PlaceHero({ place }: { place: Place }) {
  const region = regionByKey[place.region];
  const facts = [
    { term: "At its best", value: region.best },
    { term: "We suggest", value: place.nights },
    { term: "Good for", value: place.goodFor },
  ];

  return (
    <header className="relative h-[700px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-[640px] max-md:h-[600px]">
      <img
        src={place.image.src}
        alt={place.image.alt}
        className="absolute inset-0 block size-full object-cover"
        style={{ objectPosition: place.image.position ?? "50% 50%" }}
      />
      <HeroScrim
        desktop={
          "linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.9) 0%, oklab(0 0 0 / 0) 64%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)"
        }
      />

      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <SiteNav current="/places" />
        <div className="absolute inset-x-0 bottom-[60px] flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-8 max-md:bottom-7 max-md:gap-6">
          <div className="flex max-w-[700px] flex-col gap-5 max-md:gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2.5 text-[15px]/[22px] text-[#c4d2db] max-md:text-[14px]/[20px]"
            >
              <Link href="/places" className="text-white hover:underline">
                Places
              </Link>
              <span aria-hidden>/</span>
              <span>{region.name}</span>
            </nav>
            <h1 className="m-0 font-display text-[96px]/[96px] font-medium tracking-[-0.02em] text-white max-lg:text-[72px]/[76px] max-md:text-[42px]/[46px]">
              {place.name}
            </h1>
            <p className="m-0 text-[20px]/[30px] text-[#e8eef1] transition-[opacity,translate] duration-[600ms] ease-out-quint motion-reduce:transition-none starting:translate-y-3 starting:opacity-0 max-md:text-[15px]/[24px]">
              {place.summary}
            </p>
          </div>

          <dl className="m-0 flex shrink-0 gap-px border border-white/24 bg-white/18 backdrop-blur-[18px] max-md:w-full">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="flex flex-col gap-1 bg-[#102532b8] px-[22px] py-[18px] max-md:flex-1 max-md:px-3.5 max-md:py-3"
              >
                <dt className="text-[13px]/[18px] text-[#b8c8d1] max-md:text-[12px]/[16px]">
                  {fact.term}
                </dt>
                <dd className="m-0 text-[16px]/[22px] text-white max-md:text-[13px]/[18px]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}
