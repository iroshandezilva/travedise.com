# Photos, chosen by colour

Every photo the site uses is a key in `src/data/photos.ts`. `pnpm photo-colours` measures each one
and writes `src/data/photo-colours.json`:

```json
"leopard": { "family": "green", "warmth": 0.98, "lightness": 0.6, "colourfulness": 0.71,
             "busy": 0.5, "textZone": 0.62, "whiteText": false, "colours": [{ "hex": "#858838", "share": 0.28 }, …] }
```

- `family` — `green` (forest, tea, wildlife), `sea` (water, sky), `earth` (stone, sand, wood, people,
  warm and low in colour), `dusk` (sunsets, lamp light), `night` (mostly dark)
- `warmth` −1 cool … +1 warm · `colourfulness` 0 grey … 1 vivid · `busy` 0 calm … 1 busy
- `whiteText` — the bottom-left (where hero and band titles sit) is dark enough for white text with the scrim

Run `pnpm photo-colours` after adding or replacing a photo; it also refreshes the sheet in
`docs/design.html#photos`. If the eye disagrees with a family, pin it in `PINNED` in
`scripts/photo-colours.mjs` with a one-line reason.

## Family for the content

| Content | First family | Pairs with |
|---|---|---|
| Hill country, tea, wildlife, rainforest | green | earth |
| Coasts, the Maldives, whales, beaches | sea | earth, dusk for evenings |
| Culture, temples, ruins, food, people | earth | dusk, green |
| Weddings, honeymoons, evenings, festivals | earth or dusk | sea |
| Closing bands, night scenes | night | dusk |
| Services, vehicles, planning | earth | the family of the trip shown |

## Rules

1. Photos side by side (a card row, a pair) share a family, or keep `warmth` on the same side of 0.
2. One loud photo per view: only one with `colourfulness` above 0.7 on screen.
3. Next to a photo with `busy` above 0.55, put one under 0.4.
4. Text over a photo only when `whiteText` is true, plus the standard scrim. Otherwise put the text
   beside or below the photo.
5. Never tint, filter or grade a photo. White balance only.
6. A photo already used as a hero elsewhere is a figure here, not a hero.
7. Real places, people doing things. Never an AI-generated photo presented as a real place.

```
Choosing a photo for a slot
 1. Family for the content?            → the table
 2. What sits next to it?              → same family, or same side of warmth 0
 3. A loud photo already in view?      → colourfulness under 0.7
 4. Will text sit on it?               → whiteText: true
 5. Already a hero somewhere else?     → use it as a figure
```

Find candidates:

```bash
node -e 'const j=require("./src/data/photo-colours.json");for(const[k,v]of Object.entries(j))if(v.family==="green"&&v.whiteText)console.log(k,v.warmth,v.busy)'
```

Slots, shot lists, alt text and captions: the `image-brief` skill.
