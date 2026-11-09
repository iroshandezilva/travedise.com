/** The home page. The words and photos are in `src/content/pages/home.json`. */
import data from "@/content/pages/home.json";

export type Region = {
  name: string;
  /** Finishes "See … on the map". */
  short: string;
  image: string;
  alt: string;
  /** The small photo overlapping the corner of the main one. Decorative. */
  inset: string;
  body: string;
  months: string;
  nights: string;
  known: string;
  access: string;
};

export const hero = data.hero;
export const regions = data.regions as Region[];
export const journeyPhotos = data.journeyPhotos as Record<string, { image: string; alt: string }>;
export const frames = data.frames;
export const teamFrames = data.teamFrames;
export const team = data.team;
export const planningSteps = data.planningSteps;
export const travelNotes = data.travelNotes;
export const homeQuestions = data.homeQuestions;
export const readyBand = data.readyBand;
