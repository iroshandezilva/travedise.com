import { contactEmail, contactOffices, contactPhones } from "@/data/contact";
import { TOURS } from "@/data/site";

/**
 * What `src/scripts/webmcp-tools.ts` hands to in-browser agents. Written into each page as
 * JSON by `WebMcpData.astro`, so none of the content ships as JavaScript.
 */
export const webMcpData = {
  packages: TOURS.map((t) => ({
    title: t.title,
    priceLine: `From US$ ${t.price} per person / ${t.days} days`,
    href: t.href,
  })),
  contact: {
    email: contactEmail.value,
    phones: contactPhones.numbers.map((n) => `${n.number} ${n.region}`),
    offices: contactOffices.map((o) => ({ name: o.label, address: o.lines.join(" ").trim() })),
  },
};

export type WebMcpData = typeof webMcpData;
