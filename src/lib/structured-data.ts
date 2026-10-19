import { SOCIALS } from "@/lib/socials";
import { contactEmail, contactPhones } from "@/data/contact";

import { SITE_URL } from "./site";

const ORG_ID = `${SITE_URL}/#organization`;

const DESCRIPTION =
  "Travedise is a Sri Lanka tour operator with offices in Australia and Sri Lanka, offering tailor-made and packaged holidays — honeymoon, family, wildlife, hill country and beach tours.";

/**
 * schema.org JSON-LD for the whole site: the business (Organization + TravelAgency, with
 * contact points and both offices) and the website. Rendered once in the root layout.
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": ORG_ID,
      name: "Travedise",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/6a3375a31e3fd9ef9da7e4ff_69e71a6f589fe83624cd3faf_travedise-logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og/travedise.jpg`,
      description: DESCRIPTION,
      email: contactEmail.value.toLowerCase(),
      telephone: contactPhones.numbers[0].number,
      contactPoint: contactPhones.numbers.map((phone) => ({
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: phone.number,
        email: contactEmail.value.toLowerCase(),
        ...(phone.region === "(Au)" ? { areaServed: "AU" } : {}),
      })),
      address: [
        {
          "@type": "PostalAddress",
          name: "Australia office",
          streetAddress: "5/22-30 Brighton St",
          addressLocality: "Bundeena",
          addressRegion: "NSW",
          postalCode: "2230",
          addressCountry: "AU",
        },
        {
          "@type": "PostalAddress",
          name: "Sri Lanka office",
          streetAddress: "212A Inland Hill Road, Karapitiya",
          addressLocality: "Galle",
          addressCountry: "LK",
        },
      ],
      sameAs: SOCIALS.map((social) => social.href.split("?")[0]),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Travedise",
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ],
};

/** Serialize for a <script type="application/ld+json">, escaping `<` so the JSON cannot close the script tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
