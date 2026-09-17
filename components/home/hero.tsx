import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { heroBackgrounds, heroDeck } from "@/content/home";
import type { TravelPackage } from "@/content/packages";
import { cn } from "@/lib/cn";

import { ArrowUpRight, BookTourButton } from "./book-tour-button";
import { HeroBackground } from "./hero-background";
import {
  CarouselNext,
  CarouselPrev,
  CarouselProgress,
  CarouselViewport,
  ScrollCarousel,
} from "./scroll-carousel";

/**
 * Home hero: the sliding photo background, headline and "Book Your Tour" button, and a
 * scrollable deck of package cards in the bottom-right corner (full width ≤767px).
 */
export function Hero() {
  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 z-3 flex flex-col items-center justify-between">
        <div className="flex items-start justify-center">
          <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-start pt-40 xl:pt-[180px] 3xl:pt-[400px] max-lg:pt-[200px] max-md:pt-[190px]">
            <div className="pointer-events-auto relative z-1 mx-auto flex w-full max-w-[750px] flex-col items-center justify-center gap-[30px] overflow-clip max-sm:gap-5">
              <Reveal
                as="h1"
                delay={50}
                className="m-0 text-center font-serif leading-none text-navy-800 max-lg:mx-auto max-lg:w-4/5 max-sm:w-auto"
              >
                Your Next Adventure Starts Here
              </Reveal>
              {/* Same slide-in as <Reveal delay={100}>, but on first paint: sliding up from inside
                  this clipping box, the button starts fully clipped, so an IntersectionObserver
                  would never see it. The hero is always in view on load anyway. */}
              <div className="transition-[opacity,translate] delay-100 duration-1000 ease-out-quart motion-reduce:transition-none starting:translate-y-[100px] starting:opacity-0">
                <BookTourButton href="/contact">Book Your Tour</BookTourButton>
              </div>
            </div>
          </div>
        </div>
        <div className="z-0 flex w-full items-end justify-between pb-1 2xl:pb-20 max-lg:pb-6 max-md:mr-auto max-md:ml-5 max-md:flex-col max-md:pb-[70px] max-sm:pb-[35px]">
          <div className="container-site flex items-center justify-start pb-10 2xl:pl-[100px] 3xl:pl-[220px] max-md:pr-5 max-md:pb-[30px] max-sm:pl-0" />
          <Reveal
            delay={250}
            className="pointer-events-auto w-[700px] overflow-clip max-lg:w-full max-md:mr-auto max-md:ml-0 max-md:overflow-visible max-sm:pb-5"
          >
            <HeroDeck cards={heroDeck} />
          </Reveal>
        </div>
      </div>
      <HeroBackground images={heroBackgrounds} />
    </section>
  );
}

const arrow =
  "absolute z-3 flex w-5 items-center justify-center overflow-hidden text-white transition-all duration-250 ease-[ease] hover:text-lime max-md:text-navy/60 max-md:hover:text-navy";

function HeroDeck({ cards }: { cards: TravelPackage[] }) {
  return (
    <ScrollCarousel>
      <div className="relative h-full bg-transparent max-lg:w-[450px] max-md:w-full">
        <CarouselViewport>
          {cards.map((pkg) => (
            <div
              key={pkg.slug}
              className="relative mr-2.5 w-[272px] shrink-0 snap-start 3xl:w-[290px]"
            >
              <DeckCard pkg={pkg} />
            </div>
          ))}
        </CarouselViewport>
        <CarouselPrev
          label="Previous package"
          className={cn(
            arrow,
            "right-[100px] -bottom-[45px] max-lg:right-[90px] max-lg:-bottom-[35px] max-sm:right-[55px] max-sm:-bottom-[50px]",
          )}
        >
          <svg viewBox="0 0 22 22" fill="none" aria-hidden className="block w-full">
            <path
              d="M0.686344 10.3125L6.41551 4.58333L6.87384 5.04167L1.23955 10.676L21.6693 10.676L21.6693 11.324L1.23955 11.324L6.87384 16.9583L6.41551 17.4167L0.686344 11.6875C0.307303 11.3085 0.307302 10.6915 0.686344 10.3125Z"
              fill="currentColor"
            />
          </svg>
        </CarouselPrev>
        <CarouselNext
          label="Next package"
          className={cn(
            arrow,
            "right-[60px] -bottom-[45px] z-4 max-lg:-bottom-[35px] max-sm:right-5 max-sm:-bottom-[50px]",
          )}
        >
          <svg viewBox="0 0 22 22" fill="none" aria-hidden className="block w-full">
            <path
              d="M21.3176 10.3125L15.5884 4.58333L15.1301 5.04167L20.7644 10.676L0.334604 10.676L0.334605 11.324L20.7644 11.324L15.1301 16.9583L15.5884 17.4167L21.3176 11.6875C21.6966 11.3085 21.6966 10.6915 21.3176 10.3125Z"
              fill="currentColor"
            />
          </svg>
        </CarouselNext>
      </div>
      <CarouselProgress
        className="relative mt-10 h-[1.5px] w-[302px] rounded-[10px] bg-white/40 backdrop-blur-[20px] max-lg:mt-[30px] max-md:bg-slate-300 max-sm:mx-0 max-sm:mt-10 max-sm:w-[200px]"
        thumbClassName="absolute inset-y-0 left-0 rounded-[10px] bg-white max-md:bg-surface-3"
      />
    </ScrollCarousel>
  );
}

function DeckCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <Link
      href={pkg.href}
      className="flex h-[260px] w-[272px] max-w-full flex-col gap-2.5 rounded-card bg-white px-1.5 pt-1.5 pb-4 no-underline outline-1 outline-black/10 3xl:w-[290px]"
    >
      <div className="relative isolate flex h-4/5 flex-col items-end justify-start overflow-hidden rounded-[14px] pt-3 pr-3">
        <img
          src={pkg.image}
          alt=""
          className="absolute inset-0 -z-1 block size-full max-w-none object-cover object-top"
        />
        <div className="rounded-[99px] bg-white px-2.5 py-[5px] text-[14px]/6 text-navy">
          {pkg.priceLine}
        </div>
      </div>
      <div className="flex items-center justify-between px-1.5">
        <h2 className="m-0 font-heading text-[16px]/[109%] font-medium tracking-[0.4px] text-navy">
          {pkg.title}
        </h2>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
