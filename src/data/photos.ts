/**
 * Every photo the pages use, by key. Files live in `src/assets/photos` (the site's own) and
 * `src/assets/stock` (free Unsplash photos used until the shoot; `slug` is the Unsplash page,
 * credited on /sitemap). Astro resizes and converts them at build.
 */
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/{photos,stock}/*.jpg", {
  eager: true,
});

type Meta = { file: string; alt: string; place: string; slug?: string };

const own = (file: string, alt: string, place: string): Meta => ({ file: `photos/${file}`, alt, place });
const stock = (file: string, alt: string, place: string, slug?: string): Meta => ({ file: `stock/${file}`, alt, place, slug });

const META = {
  teaPluckers: own("tea-pluckers", "Two tea pluckers at work on a hillside estate above a waterfall", "Hill country, Sri Lanka"),
  sigiriya: own("sigiriya", "Sigiriya rock above the water gardens", "Sigiriya, Sri Lanka"),
  mist: own("mist", "Mist over the forest before sunrise", "Sri Lanka"),
  trainBlue: own("train-blue", "A blue train crossing the Nine Arch Bridge", "Ella, Sri Lanka"),
  trainRed: own("train-red", "The red train on the Nine Arch Bridge near Ella", "Nine Arch Bridge, Sri Lanka"),
  archesTea: own("arches-tea", "The Nine Arch Bridge seen from the tea below", "Ella, Sri Lanka"),
  kandySteps: own("kandy-steps", "Steps up to the Bahirawakanda Buddha above Kandy", "Kandy, Sri Lanka"),
  templeNight: own("temple-night", "The Temple of the Tooth lit across Kandy lake", "Temple of the Tooth, Kandy"),
  elephants: own("elephants", "Elephants on the grass at Minneriya", "Minneriya, Sri Lanka"),
  coconutHill: own("coconut-hill", "Palms above the sea at Coconut Tree Hill, Mirissa", "Mirissa, Sri Lanka"),
  beachCouple: own("beach-couple", "A couple walking the beach at sunset", "South coast, Sri Lanka"),
  jeep: own("jeep", "A Travedise jeep parked under a tree on the road south", "Our jeep"),
  leopard: own("leopard", "A leopard crossing the track in front of a safari jeep", "Yala, Sri Lanka"),
  moonstone: own("moonstone", "The carved moonstone and steps at Polonnaruwa", "Polonnaruwa, Sri Lanka"),
  galleStreet: own("galle-street", "A lantern-lit street of cafes in Galle Fort", "Galle Fort"),
  tableForTwo: own("table-for-two", "A table set for two on the sand at dusk", "South coast, Sri Lanka"),
  traveller: own("traveller", "A traveller looking out over the hills", "Sri Lanka"),
  sigAerial: stock("sigAerial", "Sigiriya rock rising out of the forest, seen from the air", "Sigiriya", "sigiriya-rock-fortress-in-sri-lanka-smUAKwMT8XA"),
  sigPath: stock("sigPath", "The path to Sigiriya rock across the water gardens", "Sigiriya", "sigiriya-rock-fortress-in-sri-lanka-KYBc1eq0dJo"),
  dambCave: stock("dambCave", "A row of golden Buddha statues inside a cave temple", "Dambulla", "row-of-golden-buddha-statues-in-a-dimly-lit-cave-QxaWoVgvi4I"),
  dambPaint: stock("dambPaint", "Painted Buddhas covering a cave ceiling", "Dambulla", "a-wall-with-a-bunch-of-paintings-on-it-1ul4-hqm48M"),
  teaMist: stock("teaMist", "Tea bushes on a misty hillside", "Hill country", "lush-green-tea-plantation-on-a-misty-hillside-ZWdrM9IBBIE"),
  teaAerial: stock("teaAerial", "Estate roads curving through the tea, from above", "Hill country", "aerial-photography-of-green-fields-during-daytime-i9eaAR4dWi8"),
  galleLight: stock("galleLight", "Galle lighthouse behind the palms", "Galle Fort", "white-lighthouse-WDVMyBsSSwY"),
  galleRamp: stock("galleRamp", "People sitting on the fort walls by the clock tower", "Galle Fort", "people-sitting-on-ancient-fortress-walls-with-a-clock-tower-rg9O3M_U9I8"),
  galleAerial: stock("galleAerial", "Galle Fort and its lighthouse on the point, from the air", "Galle", "aerial-view-of-city-near-sea-during-daytime-EBxsNaN0mig"),
  jafClock: stock("jafClock", "The carved gateway towers of a Hindu temple", "Jaffna", "a-large-white-and-gold-building-with-a-clock-tower-ktMbEL0lRQ8"),
  jafParade: stock("jafParade", "A temple chariot pulled through the crowd at a festival", "Jaffna", "a-large-crowd-of-people-watching-a-float-in-a-parade-nCsyGOSclNU"),
  gopuram: stock("gopuram", "A carved temple tower lit at night", "Hindu temple", "a-very-tall-white-building-with-statues-on-top-of-it-wOI7yfuwu7Y"),
  goldTemple: stock("goldTemple", "Fishing boats moored below a temple tower", "The north", "boats-docked-near-a-golden-temple-structure-m-wLjwSxeNQ"),
  stilt1: stock("stilt1", "Stilt fishermen on their poles off a rocky beach", "South coast", "stilt-fishermen-on-sri-lanka-coast-Qx8_d5dGhrs"),
  stilt2: stock("stilt2", "Stilt fishermen on poles in the surf at dusk", "South coast", "person-fishing-while-standing-on-brown-wooden-post-during-daytime-oolMDaGRRDQ"),
  arugAerial: stock("arugAerial", "Fishing boats pulled up on the sand, seen from above", "East coast", "aerial-photography-of-boats-on-shore-during-daytime-FHAHnF9C0Sw"),
  trincoSun: stock("trincoSun", "The sun going down over a calm bay", "East coast", "a-body-of-water-with-a-sunset-in-the-background-c6XYKa2XnbU"),
  monksField: stock("monksField", "Monks in saffron robes walking under the trees", "Sri Lanka", "a-group-of-monks-walking-through-a-lush-green-field-GGFnW4JB-Eg"),
  monkYoung: stock("monkYoung", "A young monk smiling from a temple window", "Sri Lanka", "smiling-young-monk-in-wooden-window-UTny1N0JHQo"),
  dancer1: stock("dancer1", "A Kandyan dancer in full costume at night", "Kandy", "man-in-ornate-traditional-costume-performing-a-cultural-dance-KMa3ZqMM9UE"),
  fireDance: stock("fireDance", "Fire dancers spinning flames in a night procession", "Kandy perahera"),
  mask: stock("mask", "A carved and painted mask with a peacock crown", "Ambalangoda masks", "colorful-wooden-mask-with-fierce-expression-and-peacock-feathers-N2nrejUNV3Y"),
  foodLeaf: stock("foodLeaf", "Rice and curries served on a banana leaf", "Rice and curry", "a-sri-lankan-meal-is-presented-on-a-leaf-3gvwRZ_Omgw"),
  foodBfast: stock("foodBfast", "Hoppers and sambols on banana leaves", "Breakfast", "delicious-sri-lankan-breakfast-is-served-on-platters-9iMvxXPtFCU"),
  foodRice: stock("foodRice", "A plate of rice with several curries", "Rice and curry", "a-plate-of-rice-and-various-south-asian-dishes-_WQ1qARALg4"),
  teaBowl: stock("teaBowl", "A bowl of tea among green leaves", "Ceylon tea", "bowl-of-amber-liquid-in-foliage-Qaor6nxikUM"),
  whale: stock("whale", "A humpback whale breaching in open water", "Whale watching", "humpback-whale-breaching-blue-ocean-lwACYK8ScmA"),
  whaleTail: stock("whaleTail", "A whale’s tail lifting out of the sea", "Whale watching", "whale-tail-splashing-water-as-it-dives-into-ocean-R-bhD7Paup4"),
  elephants2: stock("elephants2", "A line of elephants walking by a river", "Sri Lanka", "shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4"),
  polo1: stock("polo1", "The round Vatadage shrine and its stone steps", "Polonnaruwa", "a-large-stone-structure-with-a-statue-on-top-of-it-NjELNF_q4UY"),
  polo2: stock("polo2", "A seated Buddha cut from the rock", "Gal Vihara, Polonnaruwa", "a-statue-of-a-person-sitting-in-a-lotus-position-I9N8rE3tzq8"),
  polo3: stock("polo3", "Stone steps and guardstones of an ancient shrine", "Polonnaruwa", "an-old-building-with-a-bunch-of-statues-around-it-vuVmWNtLAaY"),
  waterfall: stock("waterfall", "A waterfall dropping into a misty valley", "Hill country", "waterfall-cascading-down-lush-mountain-cliff-Wak57_M4JKM"),
  palms: stock("palms", "Palms leaning over a turquoise bay", "South coast", "palm-trees-on-beach-shore-during-daytime-iduEaeBB_rQ"),
  mvSandbar: stock("mvSandbar", "Two people walking a white sandbar in turquoise water", "The Maldives", "couple-walking-on-a-pristine-white-sandbar-in-turquoise-water-a5Wuqass63A"),
  mvHouse2: stock("mvHouse2", "Water villas over a clear lagoon", "The Maldives", "brown-wooden-house-on-body-of-water-under-blue-sky-during-daytime-AjBzl6gdCL0"),
  mvHouses: stock("mvHouses", "Water villas on stilts in a shallow lagoon", "The Maldives", "a-couple-of-houses-sitting-on-top-of-a-body-of-water-iwZqmickJxA"),
  mvSunset: stock("mvSunset", "Villas under the palms at sunset", "The Maldives", "brown-wooden-house-on-body-of-water-during-sunset-4UeXmwHuB3g"),
  mvPath: stock("mvPath", "A boardwalk between two rows of water villas", "The Maldives", "overwater-bungalows-line-a-wooden-path-dejzecdfEwE"),
  mvManta: stock("mvManta", "A manta ray swimming through a school of fish", "Manta ray", "manta-ray-swimming-with-silver-fish-SbcDDmPacUI"),
  mvRay: stock("mvRay", "Snorkellers watching manta rays", "The Maldives", "grey-and-black-stingray-in-underwater-photography-F54xLcv9wQ0"),
  mvPlaneWater: stock("mvPlaneWater", "A seaplane resting on turquoise water", "Seaplane transfer", "plane-land-on-water-eJDTbRkMVWM"),
  mvBoatIsland: stock("mvBoatIsland", "A speedboat heading for a resort island", "The Maldives", "boat-approaching-tropical-island-resort-maldives-4F4OtnNjpmc"),
  mvIslet: stock("mvIslet", "A small island ringed by reef", "The Maldives", "islet-under-blue-sky-DpMwuzj7iDk"),
  wedCeremony: stock("wedCeremony", "A wedding ceremony on the sand under a canopy", "Beach wedding", "wedding-ceremony-taking-place-on-a-sandy-beach--ogyxCF3nlU"),
  wedStand: stock("wedStand", "A wedding arch on the sand at the water’s edge", "Beach wedding", "brown-wooden-stand-on-brown-sand-near-body-of-water-during-daytime-MeNE7Ockq4w"),
  wedCouple: stock("wedCouple", "A couple holding hands on the beach", "Elopement", "a-bride-and-groom-standing-on-a-beach-holding-hands-evMXfNP1ZZ8"),
  tukGreen: stock("tukGreen", "A green tuk-tuk parked on a narrow street", "Tuk-tuk", "a-green-tuk-tuk-parked-on-a-narrow-street-Rp8hznJaH1s"),
  groupTable: stock("groupTable", "Friends at a long table under the trees", "Group trip", "group-of-young-adults-at-table-iEY-qu5lLFc"),
  groupEat: stock("groupEat", "A group sharing dinner", "Group trip", "a-group-of-people-sitting-around-a-table-eating-food-F2lsSOd2DS8"),
  groupLong: stock("groupLong", "A long table laid outdoors under string lights", "Group dinner", "a-long-table-with-a-couple-standing-behind-it-rng4Glt1YoY"),
  mapGlasses: stock("mapGlasses", "Reading glasses resting on a paper map", "Planning", "eyeglasses-on-map-qoAIlAmLJBU"),
  slothBear: stock("slothBear", "A sloth bear standing in long grass at the forest edge", "Sloth bear", "a-sloth-bear-stands-amidst-green-foliage-ggNi9LFyA7s"),
  kingfisher: stock("kingfisher", "A white-throated kingfisher perched on a branch", "Kingfisher", "blue-and-brown-bird-on-tree-branch-during-daytime-fKAfO9sivv0"),
  turtleBeach: stock("turtleBeach", "A sea turtle resting on the sand at the water's edge", "Sea turtle", "a-sea-turtle-is-laying-on-the-beach-IwUTrF9M3EM"),
  whaleShark: stock("whaleShark", "A whale shark swimming in deep blue water", "Whale shark", "whale-shark-swimming-in-deep-ocean-wXt0DiISf38"),
  mvTurtle: stock("mvTurtle", "A sea turtle swimming over a coral reef", "House reef", "a-sea-turtle-swimming-over-a-coral-reef-S087QI1YOI8"),
  carSedan: stock("carSedan", "A white sedan parked on a coast road", "Comfort car", "white-sedan-on-gray-asphalt-road-during-daytime-73XAgT8DOpo"),
  suvDark: stock("suvDark", "A dark SUV on a dirt track between palms", "Premium SUV", "a-dark-suv-with-circular-headlights-on-a-dirt-road-ZadmfemWal0"),
  vanHills: stock("vanHills", "A white van parked above green hills at sunset", "Family van", "a-van-parked-on-top-of-a-dirt-road-lGOAzV8s_ko"),
  miniCoach: stock("miniCoach", "A white mini coach parked at a temple gate", "Mini coach", "white-toyota-bus-T-WRLSsiZYE"),
  coachRoad: stock("coachRoad", "A large touring coach on a road lined with trees", "Luxury coach", "white-and-black-bus-on-road-during-daytime-7Vt3Kao-JJc"),
  bundeena: stock("bundeena", "Clear water and a moored boat off the beach at Bundeena", "Bundeena, Australia", "a-beach-with-people-and-a-boat-in-the-water-a78xySNwC3M"),
} satisfies Record<string, Meta>;

export type PhotoKey = keyof typeof META;

export type Photo = Meta & { key: PhotoKey; image: ImageMetadata; stock: boolean };

export function photo(key: PhotoKey): Photo {
  const meta = META[key];
  const image = files[`/src/assets/${meta.file}.jpg`]?.default;
  if (!image) throw new Error(`Photo file missing for "${key}": src/assets/${meta.file}.jpg`);
  return { ...meta, key, image, stock: meta.file.startsWith("stock/") };
}

/** Stock photos with an Unsplash page, for the credits on /sitemap. */
export const stockCredits = (Object.keys(META) as PhotoKey[])
  .map(photo)
  .filter((p) => p.stock)
  .map((p) => ({ alt: p.alt, href: p.slug ? `https://unsplash.com/photos/${p.slug}` : "https://unsplash.com" }));
