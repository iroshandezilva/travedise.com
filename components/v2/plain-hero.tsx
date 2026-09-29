import { HeroScrim, SiteNav } from "@/components/v2/site-nav";

/**
 * A short dark hero for pages that have no photograph: the same floating nav as the
 * rest of the site, then a title and one line.
 */
export function PlainHero({
  title,
  body,
  current,
}: {
  title: string;
  body?: string;
  current?: string;
}) {
  return (
    <header
      className="relative h-[460px] w-full shrink-0 overflow-clip bg-[#0c1526] gutter-v2 max-md:h-[420px]"
      style={{
        backgroundImage:
          "radial-gradient(900px 480px at 8% 0%, rgba(71,205,255,0.22), rgba(0,0,0,0) 62%), radial-gradient(760px 460px at 92% 12%, rgba(196,175,140,0.2), rgba(0,0,0,0) 62%), linear-gradient(180deg, rgb(21,36,60) 0%, rgb(12,21,38) 70%)",
      }}
    >
      <HeroScrim desktop="linear-gradient(0deg, rgb(12,21,38) 0%, rgba(12,21,38,0) 42%)" />
      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        <SiteNav current={current} />
        <div className="absolute inset-x-0 bottom-[58px] flex max-w-[820px] flex-col gap-[18px] max-md:bottom-8 max-md:gap-3">
          <h1 className="m-0 font-display text-[60px]/[66px] font-medium tracking-[-0.01em] text-white max-lg:text-[48px]/[54px] max-md:text-[34px]/[40px]">
            {title}
          </h1>
          {body ? (
            <p className="m-0 max-w-[640px] text-[19px]/[29px] text-[#e8eef1] max-md:text-[15px]/[24px]">
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
