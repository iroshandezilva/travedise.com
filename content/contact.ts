/**
 * Contact details, verbatim from the Webflow site. The contact page they came from is
 * gone (see `/plan-your-trip`); the structured data and the WebMCP tools still read them.
 */

const ICON = {
  mail: "/assets/6a90445eb2a6e026c5f88276_mail-02.png",
  phone: "/assets/6a9046c754ba39fc887786ef_call-02.png",
  location: "/assets/6a904683726d85c1e0f2e58d_location-06.png",
};

export type ContactLabel = { icon: string; label: string };

export const contactEmail = { icon: ICON.mail, label: "Email", value: "Contact@travedise.com" };

export const contactPhones = {
  icon: ICON.phone,
  label: "Call Us",
  numbers: [
    { number: "+61426965569", region: "(Au)" },
    { number: "+94763972171", region: "(Global)" },
  ],
};

export const contactOffices: (ContactLabel & { lines: string[] })[] = [
  {
    icon: ICON.location,
    label: "Au Office",
    lines: ["5/22-30 Brighton St, ", "Bundeena NSW 2230, ", "Australia"],
  },
  {
    icon: ICON.location,
    label: "Sri Lanka Office",
    lines: ["212A Inland Hill Road,", "Karapitiya,", "Galle."],
  },
];
