import { HeroScrim, SiteNav } from "@/components/v2/site-nav";
import { journeysHero } from "@/content/v2/journeys";

/** A shorter hero than a journey's own page: one photo, the title and a line. */
export function JourneysHero() {
  return (
    <header className="relative h-[560px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-[500px] max-md:h-[440px]">
      <img
        src={journeysHero.image}
        alt={journeysHero.alt}
        className="absolute inset-0 block size-full object-cover"
      />
      <HeroScrim desktop="linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.86) 0%, oklab(0 0 0 / 0) 62%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)" />

      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <SiteNav />
        <div className="absolute inset-x-0 bottom-[58px] flex max-w-[820px] flex-col gap-[18px] max-md:bottom-8 max-md:gap-3">
          <h1 className="m-0 font-soul text-[62px]/[68px] font-medium tracking-[-0.02em] text-white max-lg:text-[48px]/[54px] max-md:text-[34px]/[40px]">
            {journeysHero.title}
          </h1>
          <p className="m-0 max-w-[660px] text-[19px]/[29px] text-[#e8eef1] transition-[opacity,translate] duration-[600ms] ease-out-quint motion-reduce:transition-none starting:translate-y-3 starting:opacity-0 max-md:text-[15px]/[24px]">
            {journeysHero.body}
          </p>
        </div>
      </div>
    </header>
  );
}
