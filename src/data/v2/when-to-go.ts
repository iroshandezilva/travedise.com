/**
 * The month guide (`/when-to-go`). The words live in
 * `src/content/pages/when-to-go.json`; this module only adds the types.
 *
 * `months[].ratings` are five regions in the order of `regions`. The places pages read
 * their region's row from here, so the two pages can never disagree about the weather.
 */
import data from "@/content/pages/when-to-go.json";

export type Level = 1 | 2 | 3;
type Ratings = [Level, Level, Level, Level, Level];
export type Month = { name: string; title: string; body: string; ratings: Ratings };

export const whenToGoHero = data.whenToGoHero;
export const levelLabels = data.levelLabels as Record<Level, string>;
export const regions = data.regions;
export const months = data.months as Month[];
export const monthPicker = data.monthPicker;
export const yearAtAGlance = data.yearAtAGlance;
