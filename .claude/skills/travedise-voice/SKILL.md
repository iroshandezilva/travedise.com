---
name: travedise-voice
description: How Travedise writes — the voice of a small team of travel designers in Galle and Bundeena, with the rules, banned words and patterns taken from the existing travel notes, places and packages. Load before writing or editing any words on the site, including copy in design mock-ups.
---

# The Travedise voice

Written from the ten travel notes in `src/content/blog/` and the fourteen places in
`src/content/places/`. When in doubt, read `which-coast-and-when.json` and `places/ella.json` —
they are the reference.

## Who is speaking

"We" — the Travedise team, travel designers with offices in Galle (Sri Lanka) and Bundeena
(Australia). We have been to every place we write about and we say what we would do. The reader is
"you": someone already thinking about a trip, often with dates in mind.

## The rules

1. **Plain and calm.** Short sentences. One idea each. No exclamation marks.
2. **Honest, including the downsides.** "It is busier than it was, but the walking has not
   changed." "Leopards are never promised, only made likely." Saying the hard part is what makes
   the rest believable.
3. **Concrete.** Months, hours, place names, how long the drive takes. "The day-trippers leave by
   six" beats "enjoy a quieter atmosphere".
4. **Advice, not description.** Every paragraph should help someone decide: when to go, where to
   stay, what to skip, what to book early.
5. **No contractions.** "It is", "we do not", "that is". The existing copy has none.
6. **No em dashes in copy.** Use a full stop, a comma or a colon. (Code comments may use them.)
7. **British spelling.** colour, travellers, organised, metres.
8. **Sentence case** for headings and titles. Only names get capitals.

## Words we do not use

paradise, hidden gem, breathtaking, stunning, nestled, must-see, bucket list, unforgettable,
once in a lifetime, perfect (as praise), exotic, magical, vibrant, boasts, embark, delve,
"look no further", "whether you are … or …". A few old package pages still have some of
these from the Webflow site — don't copy them; replace them when you touch that copy.

## Patterns the site uses

- **Title + italic ending.** The end of a title is set in Ragmont italic: "Which coast,
  *and when*". In JSON that is `titleEm` (notes) or `em` (CTA headings) — it must be the exact
  ending of the text.
- **Note titles** name a place or a decision, then a twist after a comma: "A morning in Yala,
  and why we leave at five", "Polonnaruwa, on two wheels".
- **Standfirst:** one sentence under the title that says what the reader will get.
  "How the two monsoons decide where you should be, month by month."
- **Dek:** two or three sentences for cards and the meta description. Opens with the useful fact.
- **Lead paragraph:** starts from what people ask us, then answers it.
- **Place lines:** one sentence, a physical picture. "A small hill town with walks from the door
  and the train running through."
- **CTA:** "Tell us your dates…" and a promise about what happens next, never a hard sell.
  "Tell us your dates and we will fit it in, with the train booked for the way in."
- **Author:** `{ "name": "The Travedise team", "role": "Travel designers in Galle and Bundeena" }`
  unless the owner names a person.

## Facts

Don't invent prices, opening hours, ticket costs, distances or dates. If a fact isn't in
`src/content/**` or given by the owner, write around it or mark it `[CHECK: …]` and list it in
your reply so the owner can confirm it before publishing.
