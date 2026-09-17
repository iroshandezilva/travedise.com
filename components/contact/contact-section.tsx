import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import {
  contactEmail,
  contactHeading,
  contactImage,
  contactOffices,
  contactPhones,
  type ContactLabel,
} from "@/content/contact";
import { cn } from "@/lib/cn";

const value = "m-0 text-h6 font-medium text-navy";

function Label({ icon, label }: ContactLabel) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} loading="lazy" width={20} alt="" className="block" />
      <p className="m-0">{label}</p>
    </div>
  );
}

/** The `/contact` body: heading, email / phone / office details and the Nine Arches photo. */
export function ContactSection() {
  return (
    <section>
      <div className="container-site">
        <div className="pt-[230px] pb-[150px] max-lg:pt-[150px] max-lg:pb-[82px] max-md:pt-[120px] max-md:pb-[90px] max-sm:pt-[100px]">
          <div className="flex w-full items-end justify-between gap-16 max-lg:gap-8 max-md:flex-col max-md:items-start max-md:gap-5">
            <div className="flex w-full max-w-[687px] flex-col items-start justify-center gap-12 overflow-clip max-lg:max-w-[550px] max-lg:gap-8 max-md:gap-4">
              <div className="flex flex-col items-start gap-4">
                <Reveal delay={50}>
                  <SectionTag>{contactHeading.tag}</SectionTag>
                </Reveal>
                <Reveal as="h2" delay={100} className="m-0 text-left font-serif">
                  {contactHeading.title}
                </Reveal>
              </div>

              <div className="flex w-full flex-col gap-8 max-lg:gap-5 max-md:gap-4">
                <Reveal delay={50} className="flex flex-col items-start gap-1">
                  <Label {...contactEmail} />
                  <h6 className={value}>{contactEmail.value}</h6>
                </Reveal>

                <Reveal delay={50} className="flex flex-col items-start gap-1">
                  <Label {...contactPhones} />
                  <div className="flex w-full items-start justify-between max-lg:flex-col">
                    {contactPhones.numbers.map(({ number, region }) => (
                      <div key={number} className="flex w-1/2 items-center gap-1">
                        <h6 className={value}>{number}</h6>
                        <h6 className={cn(value, "text-slate-400")}>{region}</h6>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={50} className="flex flex-col items-start gap-1">
                  <div className="flex w-full items-start justify-between max-lg:flex-col">
                    {contactOffices.map(({ lines, ...label }, i) => (
                      <div
                        key={label.label}
                        className={cn(
                          "flex w-1/2 flex-col gap-1 max-lg:w-full",
                          i < contactOffices.length - 1 && "max-lg:pb-6 max-md:pb-5",
                        )}
                      >
                        <Label {...label} />
                        <h6 className={value}>
                          {lines.map((line, j) => (
                            <span key={j}>
                              {j > 0 && <br />}
                              {line}
                            </span>
                          ))}
                        </h6>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal
              delay={100}
              className="relative w-full self-stretch overflow-clip rounded-[14px] max-md:min-h-[400px]"
            >
              <img
                src={contactImage}
                loading="lazy"
                alt="A couple walking through a tea plantation below the Nine Arches Bridge"
                className="absolute inset-0 size-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
