import { ArrowButton, OutlinePill, PillButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";

export default function PrimitivesPreview() {
  return (
    <>
      <div data-test="arrow-light">
        <ArrowButton href="/contact">Book Now</ArrowButton>
      </div>
      <div data-test="arrow-glass" className="bg-navy p-4">
        <ArrowButton href="/contact" variant="glass">
          Book Now
        </ArrowButton>
      </div>
      <div data-test="pill">
        <PillButton href="/blog">Read More Blogs</PillButton>
      </div>
      <div data-test="outline" className="group bg-navy p-4">
        <OutlinePill>More info</OutlinePill>
      </div>
      <SectionTag data-test="tag">Our Tour Activities</SectionTag>
      <Reveal as="h2" delay={100}>
        Reveal heading
      </Reveal>
    </>
  );
}
