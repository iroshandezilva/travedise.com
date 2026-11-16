---
name: image-brief
description: Choosing and briefing photos for Travedise content — what each image slot needs, how to search the photos the site already has, the shot-list format for new photos, and the rules for alt text and captions. Load when writing or reviewing a travel note, place, package or page that has photos.
---

# Image briefs

## Every slot has a job

Read the component that renders a slot before choosing for it — the crop and the size come from
there. The slots:

| Slot | Field | Shown as | What it needs |
|---|---|---|---|
| Note hero | `blog.image` (`src`, `alt`, `position`) | Wide hero and the note card | Landscape; the subject away from the bottom-left where the title sits; set `position` (e.g. `"50% 45%"`) to keep the subject in both crops |
| Note figure | `body[].type: "figure"` (`src`, `alt`, `caption`) | Inline in the text | Shows what the paragraph above describes |
| Place hero | `places.image` | Hero **and** every card for that place | Must read at card size: one clear subject |
| Place gallery | `places.gallery` (exactly 2) | A wide shot and a narrow one | One landscape, one portrait, different from the hero |
| Package shots | `packages.shots[]` (`src`, `label`) | The hero carousel | One per main stop, in route order; `label` names the place |
| Itinerary day | `itinerary.days[].photos[]` (`src`, `caption`) and `stay.thumb` | Day rows | What the traveller does that day, and the stay itself |

## Use what the site already has first

Every photo the pages use is a key in `src/data/photos.ts` (files in `src/assets/photos` and
`src/assets/stock`), each with its `alt` and `place`. Search those first:

```bash
grep -nE "^\s+\w+: (own|stock)\(" src/data/photos.ts | grep -i "<subject>"
```

Then choose by colour: `src/data/photo-colours.json` gives each key a family (green, sea, earth,
dusk, night), warmth, busyness and whether white text can sit on it. The rules for matching a
photo to its neighbours and its content are in `travedise-design-system` → `photos.md`; the sheet
of every photo by family is in `docs/design.html#photos`.

To see a candidate, open it with the Read tool (it shows images). A photo already used as a hero
elsewhere should not be a hero again; it can be a figure. After adding a photo to `photos.ts`, run
`pnpm photo-colours`.

## When a new photo is needed: the shot list

Put this in your reply, one block per slot:

```
Slot: places/ella.json → gallery[1] (portrait)
Subject: Nine Arch Bridge from the tea slope above, train crossing
Time / light: early morning, mist in the valley
Framing: portrait, bridge in the lower third, sky in the top third
Must not: crowds of people posing on the tracks, drone shot
Alt (draft): A blue train crossing the Nine Arch Bridge in morning mist
Caption (draft): The 9.30 from Kandy, seen from the tea above the bridge.
Source: owner's library | commission | stock (needs owner's OK for licence)
```

Stock is the last option, and only with the owner's approval of the source and licence. Never use
an AI-generated photo as if it were a real place.

## Taste

- Real Sri Lanka, real light. People doing things, not posing.
- Specific over generic: *this* beach at Tangalle, not "a beach".
- Variety across a page: wide, close, people, place — not four landscapes in a row.
- Nothing that misrepresents: no empty Sigiriya at noon in August, no leopard on a page that
  promises nothing.

## Alt text and captions

- **Alt** says what is in the picture, plainly, in one sentence without "image of" or "photo of":
  "Sigiriya rock seen from Pidurangala at first light". Under about 125 characters.
  Decorative images get `alt: ""` — rare on this site.
- **Caption** adds what the picture can't: when, why it matters, a tip. It follows the
  `travedise-voice` rules.
- Don't stuff keywords into alt text. Name the place when it is recognisable — that helps search
  and is honest.
