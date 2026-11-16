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

- **Title + italic ending.** The end of a title is set in the display italic: "Which coast,
  *and when*". One italic phrase per title, never two. In JSON that is `titleEm` (notes) or `em`
  (CTA headings) — it must be the exact ending of the text.
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

## Interface copy

The same voice, shorter. Sentence case everywhere.

| Where | Rule | Write | Not |
|---|---|---|---|
| Hero heading | 3–7 words, a promise or a place | Keep time for what matters. | Discover the magic of Sri Lanka! |
| Lede | One sentence: what, where, how | Tailor-made trips to Sri Lanka and the Maldives, planned end to end. | We are passionate about unforgettable experiences. |
| Button | Verb + object, 1–4 words | Plan your trip · See the tours · Ask about this tour | Submit · Click here · Learn more |
| Link by a heading | "All" + the thing | All tours · All destinations | View more · Explore |
| Navigation | Nouns, 1–2 words | Destinations · Travel notes | Our Blog |
| Form label | Short, above the field; never only a placeholder | When would you like to go? | Enter travel dates here |
| Help text | Why we ask, or what happens | We use this to suggest the right coast. | Required field |
| Error | The problem and the fix | Add an email address so we can send your route. | Invalid input |
| Empty state | Why it is empty, and the next step | No tours match these filters. Clear one, or tell us what you have in mind. | No results found |
| Success | What happens next, and when | Thank you, Anna. Your planner will reply within two working days. | Success! |
| Meta line | Facts only, joined by " · " | 9 days · Sri Lanka · From US$ 2,500 | Amazing 9-day adventure |

Never create urgency: no countdowns, "only 2 left", "book now before it's gone".

## Numbers, dates and names

- Counts in prose: one to nine in words, 10 and up in figures. Meta lines always use figures (9 days).
- Prices: `From US$ 2,500 per person` (a space after US$, a comma in thousands, no decimals).
- Dates: `12 March 2027`; ranges `December to April`. Times: `6am`, `5.30pm` in meta, "by six" in prose.
- Distances matter less than drive times: "about 3 hours from Kandy".
- Phones: `+94 76 397 2171`, `+61 426 965 569`.
- One spelling: Sri Lanka, the Maldives (with "the"), Malé, Nuwara Eliya, Sigiriya, Polonnaruwa,
  Anuradhapura, Dambulla, Kandy, Ella, Galle, Mirissa, Tangalle, Arugam Bay, Trincomalee, Jaffna,
  Yala, Udawalawe, Minneriya, Wilpattu, Baa Atoll, Ari Atoll, Nine Arch Bridge, Temple of the Tooth.
- Also never: journey (for a trip), curated, seamless.

## Facts

Don't invent prices, opening hours, ticket costs, distances or dates. If a fact isn't in
`src/content/**` or given by the owner, write around it or mark it `[CHECK: …]` and list it in
your reply so the owner can confirm it before publishing.
