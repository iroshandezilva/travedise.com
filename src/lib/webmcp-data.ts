import { contactEmail, contactOffices, contactPhones } from "@/data/contact";
import { packages } from "@/data/packages";
import { packagesV2, packageV2Slugs } from "@/data/v2/packages";

/**
 * What `src/scripts/webmcp-tools.ts` hands to in-browser agents. Written into each page as
 * JSON by `webmcp-data.astro`, so none of the content ships as JavaScript.
 */
export const webMcpData = {
  // Only journeys with a page; the title is the page's, the price line the card's.
  packages: packageV2Slugs.map((slug) => ({
    title: packagesV2[slug]!.title,
    priceLine: packages[slug].priceLine,
    href: packages[slug].href,
  })),
  contact: {
    email: contactEmail.value,
    phones: contactPhones.numbers.map((n) => `${n.number} ${n.region}`),
    offices: contactOffices.map((o) => ({ name: o.label, address: o.lines.join(" ").trim() })),
  },
};

export type WebMcpData = typeof webMcpData;
