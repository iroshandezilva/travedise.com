/** The trip-planning page and its form. The words are in `src/content/pages/plan.json`. */
import data from "@/content/pages/plan.json";

import { journeys } from "./journeys";

export const planHero = data.planHero;
export const planHelp = data.planHelp;
export const enquiryEmail = data.enquiryEmail;
/** The form's journey choices follow the journeys index. */
export const journeyOptions = journeys.map((j) => j.name);
export const durations = data.durations;
export const budgets = data.budgets;
export const interests = data.interests;
export const channels = data.channels;
export const countryCodes = data.countryCodes;
export const countries = data.countries;
export const heardFrom = data.heardFrom;
