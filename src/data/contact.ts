/** Contact details, in `src/content/site/contact.json`. Also used by the structured data. */
import data from "@/content/site/contact.json";

export type ContactLabel = { icon: string; label: string };

export const contactEmail = data.contactEmail;
export const contactPhones = data.contactPhones;
export const contactOffices: (ContactLabel & { lines: string[] })[] = data.contactOffices;
