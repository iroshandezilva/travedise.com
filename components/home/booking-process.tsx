import { Reveal } from "@/components/ui/reveal";
import { bookingSteps, type BookingStep } from "@/content/home";
import { cn } from "@/lib/cn";

import {
  CarouselNext,
  CarouselPrev,
  CarouselProgress,
  CarouselViewport,
  ScrollCarousel,
} from "./scroll-carousel";
import { SectionHeading } from "./section-heading";

const arrow =
  "absolute flex size-10 items-center justify-center overflow-hidden rounded-full border border-line bg-white text-navy transition-all duration-250 ease-[ease] hover:bg-navy hover:text-white";

/** "Booking Process": the four steps as a scrollable deck with arrows and a progress bar. */
export function BookingProcess() {
  return (
    <section className="bg-surface">
      <div className="container-site">
        <div className="relative flex size-full flex-col items-center justify-center gap-20 pt-[100px] pb-[170px] max-lg:pt-20 max-lg:pb-[150px] max-md:gap-[30px] max-md:pt-[60px] max-md:pb-[130px] max-sm:pb-[140px]">
          <SectionHeading
            tag="Booking Process"
            title="Follow these simple steps to reserve your trip with ease."
          />
          <ScrollCarousel>
            <Reveal delay={200} className="relative h-auto w-full bg-transparent">
              <CarouselViewport>
                {bookingSteps.map((step) => (
                  <div
                    key={step.number}
                    className="relative mr-6 h-auto w-full max-w-[calc(100%-24px)] shrink-0 grow-0 basis-[608px] snap-start"
                  >
                    <StepCard step={step} />
                  </div>
                ))}
              </CarouselViewport>
              <CarouselPrev
                label="Previous step"
                className={cn(
                  arrow,
                  "right-[50px] -bottom-[70px] z-3 max-sm:right-auto max-sm:-bottom-[60px] max-sm:left-0",
                )}
              >
                <svg viewBox="0 0 24 25" fill="none" aria-hidden className="block w-6">
                  <path
                    d="M14.5 19.5C14.367 19.5 14.233 19.447 14.135 19.342L9.993 14.912C9.357 14.276 9 13.416 9 12.5C9 11.584 9.357 10.724 10.004 10.076L14.134 5.65799C14.322 5.45499 14.639 5.44699 14.841 5.63499C15.043 5.82299 15.053 6.13999 14.865 6.34199L10.723 10.772C10.252 11.243 10 11.852 10 12.501C10 13.15 10.252 13.759 10.711 14.218L14.865 18.659C15.053 18.861 15.043 19.178 14.841 19.366C14.745 19.456 14.622 19.5 14.5 19.5Z"
                    fill="currentColor"
                  />
                </svg>
              </CarouselPrev>
              <CarouselNext
                label="Next step"
                className={cn(
                  arrow,
                  "right-0 -bottom-[70px] z-4 max-sm:right-auto max-sm:-bottom-[60px] max-sm:left-[50px]",
                )}
              >
                <svg viewBox="0 0 24 25" fill="none" aria-hidden className="block w-6">
                  <path
                    d="M10.4995 19.5C10.3765 19.5 10.2545 19.455 10.1585 19.365C9.95653 19.177 9.94653 18.86 10.1345 18.658L14.2765 14.228C14.7475 13.757 14.9995 13.148 14.9995 12.499C14.9995 11.85 14.7475 11.241 14.2885 10.782L10.1345 6.341C9.94653 6.139 9.95653 5.822 10.1585 5.634C10.3595 5.447 10.6765 5.455 10.8655 5.657L15.0075 10.087C15.6435 10.723 16.0005 11.583 16.0005 12.499C16.0005 13.415 15.6435 14.275 14.9965 14.923L10.8665 19.341C10.7675 19.446 10.6345 19.499 10.5015 19.499L10.4995 19.5Z"
                    fill="currentColor"
                  />
                </svg>
              </CarouselNext>
            </Reveal>
            <CarouselProgress
              className="absolute bottom-[110px] left-0 h-[1.5px] w-full max-w-[300px] bg-line max-lg:bottom-[90px] max-md:bottom-[75px] max-sm:bottom-[60px] max-sm:max-w-none"
              thumbClassName="h-[1.5px] bg-navy"
            />
          </ScrollCarousel>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: BookingStep }) {
  return (
    <div className="grid size-full grid-cols-2 gap-6 rounded-card border-[1.2px] border-surface-3 bg-white px-5 pt-3 pb-5 max-sm:grid-cols-1">
      <div className="flex flex-col items-start justify-start">
        <h3 className="m-0 font-serif text-[48px]/[112%] text-navy max-md:text-[40px]">
          {step.number}
        </h3>
        <div className="flex flex-col items-start justify-center gap-3 pt-3">
          <h5 className="m-0 font-serif text-[28px]/[113%] font-light text-navy">{step.title}</h5>
          <p className="m-0 font-heading tracking-[0.4px]">{step.body}</p>
        </div>
      </div>
      <img
        src={step.image}
        alt={step.title}
        loading="lazy"
        className="w-full rounded-[15px] max-sm:h-[250px] max-sm:object-cover max-sm:object-[50%_100%]"
      />
    </div>
  );
}
