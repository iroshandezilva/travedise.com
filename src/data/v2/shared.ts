/** Words shared across pages: nav, menu, gallery, questions and the closing call to action. */
import data from "@/content/site/shared.json";

export const navLinks = data.navLinks;
export const mobileNavLinks = data.mobileNavLinks;
export const menuFeature = data.menuFeature;
export const galleryImages = data.galleryImages;
export const questions = data.questions;
export const closingCta = data.closingCta;
export const questionsIntro = data.questionsIntro;

/** One question and its answer, in the open-one-at-a-time lists. */
export type QuestionItem = { q: string; a: string };

/** The footer's words that live in content: the accreditations in the legal row. */
export const footer = data.footer as { accreditations: string[] };
