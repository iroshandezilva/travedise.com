/** The privacy policy. The text is in `src/content/pages/privacy.json`. */
import data from "@/content/pages/privacy.json";

export type PolicySection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export const privacyUpdated = data.privacyUpdated;
export const privacyIntro = data.privacyIntro;
export const privacySections: PolicySection[] = data.privacySections;
