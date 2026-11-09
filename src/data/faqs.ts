/** The FAQ page. The questions are in `src/content/pages/faq.json`. */
import data from "@/content/pages/faq.json";

export type Faq = {
  question: string;
  answer: string;
};

export const faqHeading = data.faqHeading;
export const siteFaqs: Faq[] = data.siteFaqs;
export const faqPageFaqs: Faq[] = data.faqPageFaqs;
