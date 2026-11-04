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

Photos live in `public/` (`public/v2/`, `public/places/`, `public/assets/`); file names are hashes
and tell you nothing. Search the descriptions instead — every used photo already has an `alt` or
`caption`:

```bash
grep -rhoE '"(src|alt|caption|label)": "[^"]*"' src/content | paste - - | grep -i "<subject>"
```

To see a candidate, open it with the Read tool (it shows images). A photo already used as a hero
elsewhere should not be a hero again; it can be a figure.

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
