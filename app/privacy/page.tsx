import type { Metadata } from "next";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { privacyIntro, privacySections, privacyUpdated } from "@/content/privacy";
import { SHARE_IMAGE } from "@/lib/site";

const DESCRIPTION =
  "How Travedise collects, uses and protects personal information on travedise.com and when you plan a Sri Lanka tour with us.";

export const metadata: Metadata = {
  title: "Privacy Policy - Travedise - Your Next Adventure Starts Here",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Privacy Policy - Travedise - Your Next Adventure Starts Here",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Privacy Policy - Travedise - Your Next Adventure Starts Here",
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar />
      <main>
        <section>
          <div className="container-site">
            <div className="flex flex-col items-center justify-center gap-20 pt-[230px] pb-[120px] max-lg:gap-[60px] max-lg:pt-[140px] max-lg:pb-20 max-md:gap-[30px] max-md:pt-[120px] max-md:pb-[60px] max-sm:pt-[100px]">
              <div className="flex max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
                <Reveal delay={50}>
                  <SectionTag>Updated {privacyUpdated}</SectionTag>
                </Reveal>
                <Reveal as="h1" delay={100} className="m-0 text-center font-serif text-h2">
                  Privacy Policy
                </Reveal>
              </div>
              <Reveal delay={150} as="article" className="flex w-full max-w-[818px] flex-col">
                <p className="m-0 text-body-lg">{privacyIntro}</p>
                {privacySections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="mt-10 mb-[15px] font-sans text-h5 max-md:mt-[30px]">
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-[15px]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                      {section.list && (
                        <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
