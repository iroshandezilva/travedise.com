import { Reveal } from "@/components/ui/reveal";
import { aboutHero } from "@/content/about";

/** Full-height photo hero with the page title and intro pinned to the bottom. */
export function AboutHero({
  image = aboutHero.image,
  title = aboutHero.title,
  intro = aboutHero.intro,
}: {
  image?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative isolate h-screen w-full bg-[#693c3c] max-lg:h-auto max-sm:h-[90vh]">
      <img
        src={image}
        alt="A traveller climbing the steps towards a giant Buddha statue in Sri Lanka"
        className="absolute inset-0 -z-1 size-full object-cover object-left-top max-sm:object-bottom"
      />
      <div aria-hidden className="absolute inset-0 -z-1 bg-[linear-gradient(#fff0,#000000c2)]" />
      <div className="container-site flex h-full items-start justify-center">
        <div className="mx-auto flex h-full w-full max-w-[900px] flex-col items-center justify-end gap-5 pb-[100px] max-lg:px-10 max-lg:pt-[250px] max-md:pb-[60px] max-sm:gap-4 max-sm:px-4 max-sm:pt-[140px] max-sm:pb-10">
          <Reveal
            as="h1"
            delay={100}
            className="m-0 text-center font-serif text-white max-lg:text-[40px] max-md:text-[32px]"
          >
            {title}
          </Reveal>
          <Reveal
            delay={200}
            className="max-w-[600px] text-center font-heading tracking-[0.4px] text-white"
          >
            {intro}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
