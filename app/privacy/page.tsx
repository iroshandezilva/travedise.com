import type { Metadata } from "next";

import { FooterWide } from "@/components/v2/footer-wide";
import { PlainHero } from "@/components/v2/plain-hero";
import { privacyIntro, privacySections, privacyUpdated } from "@/content/privacy";

const TITLE = "Privacy policy — Travedise";
const DESCRIPTION =
  "How Travedise collects, uses and protects personal information on travedise.com and when you plan a Sri Lanka tour with us.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** The privacy policy, in the same shell as the rest of the site. */
export default function PrivacyPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PlainHero title="Privacy policy" body={`Updated ${privacyUpdated}`} current="/privacy" />
      <main>
        <article className="container-v2 gutter-v2 py-[90px] max-md:py-14">
          <div className="mx-auto flex w-full max-w-[720px] flex-col">
            <p className="m-0 text-[18px]/[29px] text-[#344458] max-md:text-[16px]/[26px]">
              {privacyIntro}
            </p>
            {privacySections.map((section) => (
              <section key={section.heading}>
                <h2 className="mt-12 mb-4 font-display text-[32px]/[40px] font-medium tracking-[-0.01em] text-v2-navy max-md:mt-10 max-md:text-[26px]/[34px]">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4 text-[16px]/[26px] text-[#344458]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <FooterWide statementFace="body" />
    </div>
  );
}
