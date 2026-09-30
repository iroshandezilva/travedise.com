/**
 * The places index (`app/places`) and the place template (`app/places/[slug]`).
 *
 * Every place belongs to one of five regions, and a region carries the months it is at
 * its best. The month strip on each place page reads that region's ratings from the
 * month guide (`when-to-go.ts`), so the two pages can never disagree about the weather.
 *
 * The map positions share the island outline and coordinate space of the journeys map.
 * `journeyStop` is the place's key in `mapStops`, when journeys stop there — the
 * "Journeys through …" section is found from it rather than listed by hand.
 */
import { images, packageImages as pkg, placeImages as shots } from "./images";
import { months, type Level } from "./when-to-go";

export type RegionKey = "hill" | "triangle" | "southwest" | "east" | "parks";

export type Region = {
  key: RegionKey;
  name: string;
  /** The months it is at its best, written out. */
  best: string;
  /** Shown under the map when the region is picked. */
  blurb: string;
  /** Its row in the month guide's ratings. */
  ratings: Level[];
};

/** Rows of `months[].ratings`, in the month guide's order. */
const ratingRow = { southwest: 0, east: 1, hill: 2, triangle: 3, parks: 4 } as const;
const ratingsFor = (key: RegionKey) => months.map((m) => m.ratings[ratingRow[key]]);

export const placeRegions: Region[] = [
  {
    key: "hill",
    name: "Hill Country",
    best: "January to March",
    blurb: "Tea estates, cool mornings and the train line. Where we put the early starts.",
    ratings: ratingsFor("hill"),
  },
  {
    key: "triangle",
    name: "Cultural Triangle",
    best: "February to April",
    blurb:
      "Rock fortresses, cave temples and ancient cities, best seen before the heat of the day.",
    ratings: ratingsFor("triangle"),
  },
  {
    key: "southwest",
    name: "South and west coast",
    best: "December to April",
    blurb: "Fort towns, whale bays and long beaches, at their calmest through the northern winter.",
    ratings: ratingsFor("southwest"),
  },
  {
    key: "east",
    name: "East coast",
    best: "May to September",
    blurb: "Calm water and empty beaches in the months the south is wet.",
    ratings: ratingsFor("east"),
  },
  {
    key: "parks",
    name: "National parks",
    best: "February to August",
    blurb: "Leopards, elephants and birds, planned around the hours the animals are out.",
    ratings: ratingsFor("parks"),
  },
];

export const regionByKey = Object.fromEntries(placeRegions.map((r) => [r.key, r])) as Record<
  RegionKey,
  Region
>;

export type Photo = { src: string; alt: string; position?: string };

export type Place = {
  slug: string;
  name: string;
  region: RegionKey;
  /** One line, on the cards. */
  line: string;
  /** The hero, and the photo on every card. */
  image: Photo;
  /** Where the dot and its label sit on the island map, in `islandPath` coordinates. */
  map: { cx: number; cy: number; tx: number; ty: number; anchor: "start" | "middle" | "end" };
  /** Label side on the place's own locator map, where the larger type needs more room. */
  locatorAnchor?: "start" | "middle" | "end";
  journeyStop?: string;

  /** Under the name in the hero. */
  summary: string;
  nights: string;
  goodFor: string;

  intro: { heading: string; paragraphs: [string, string] };
  mapCaption: string;
  doing: { lede: string; items: { title: string; body: string }[] };
  /** A wide shot and a narrow one, under the four things to do. */
  gallery?: [Photo, Photo];
  season: string;
  journeysHeading?: string;
  nearby: { heading: string; slugs: [string, string, string] };
  /** The line under "Want {name} in your route?". */
  ctaBody: string;
};

const PAIR_CAPTION = "The other dots are the places we pair it with.";

export const places: Place[] = [
  /* Hill Country ------------------------------------------------------------------- */
  {
    slug: "kandy",
    name: "Kandy",
    region: "hill",
    line: "The hill capital, built around a lake and the Temple of the Tooth.",
    image: {
      src: images.simply,
      alt: "The Temple of the Tooth across the lake in Kandy at dusk",
    },
    map: { cx: 173.7, cy: 430.9, tx: 161.7, ty: 435.4, anchor: "end" },
    journeyStop: "kandy",
    summary:
      "The last royal capital, set around a lake at the edge of the hills. Loud by day, and the place to see the island’s most important temple at evening prayers.",
    nights: "2 nights",
    goodFor: "Culture, first visits",
    intro: {
      heading: "A royal city, still in use.",
      paragraphs: [
        "Kandy was the capital of the last Sinhalese kingdom until 1815, and it has never stopped being a working city. The Temple of the Sacred Tooth Relic sits beside the lake at its centre, and people come from all over the island to pray there, morning and evening.",
        "The town itself is crowded in the middle of the day. We book a stay in the hills above it, go down for the evening puja and the walk around the lake, and head up into the tea country before the traffic builds.",
      ],
    },
    mapCaption: `In the middle of the island, where the hill country begins. ${PAIR_CAPTION}`,
    doing: {
      lede: "Kandy rewards an early start and a quiet afternoon. These are the things we build the days around.",
      items: [
        {
          title: "Evening puja at the temple",
          body: "Drums, lamps and a line of families carrying flowers. We time the visit for the doors opening, with a guide who can explain what you are watching.",
        },
        {
          title: "The walk around the lake",
          body: "A little over three kilometres on the flat, shaded most of the way, and at its best in the last hour of light.",
        },
        {
          title: "The gardens at Peradeniya",
          body: "Old trees, orchids and a lawn under a giant fig, a short drive out of town. Go in the morning, before the school groups.",
        },
        {
          title: "An evening of Kandyan dance",
          body: "Drummers, dancers and fire walkers in a small hall near the lake. An hour long, and done with real skill.",
        },
      ],
    },
    gallery: [
      { src: shots.hillTrain, alt: "A blue train crossing a viaduct in the hills" },
      { src: images.noteDates, alt: "A white spired tower on a ridge above forested hills" },
    ],
    season:
      "Kandy sits at the edge of the hills, so it follows the hill country: clear and fresh from January to March, with showers most afternoons from October to December. The Esala Perahera fills the town for ten nights in July or August, and is worth booking early for.",
    nearby: { heading: "Further into the hills.", slugs: ["nuwara-eliya", "ella", "sigiriya"] },
    ctaBody:
      "Tell us your dates and we will fit it in, with a room above the town rather than in it.",
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "hill",
    line: "Tea country at altitude, cool enough for a fire in the evening.",
    image: {
      src: shots.teaBungalow,
      alt: "Rows of tea around an estate bungalow on a hillside",
    },
    map: { cx: 197.8, cy: 482.8, tx: 185.8, ty: 487.3, anchor: "end" },
    journeyStop: "nuwara",
    summary:
      "The highest town on the island, among the tea estates. Cool mornings, mist in the valleys, and a fire lit in the evening.",
    nights: "2 nights",
    goodFor: "Couples, slow travellers",
    intro: {
      heading: "Up in the tea.",
      paragraphs: [
        "Nuwara Eliya sits at around 1,900 metres, and the British built it as an escape from the heat of the coast. The town still has the brick post office and the racecourse to show for it, but the reason to come is what surrounds it: tea on every slope, running up into the cloud.",
        "We put people in a planter’s bungalow out on an estate rather than in town. You wake to the pickers already on the hillside, walk before breakfast, and spend the afternoon doing very little by the fire.",
      ],
    },
    mapCaption: `High in the middle of the hill country. ${PAIR_CAPTION}`,
    doing: {
      lede: "Nuwara Eliya is about cool air and long views. These are the things we build the days around.",
      items: [
        {
          title: "A morning on a tea estate",
          body: "Walk the rows with the pickers, then follow the leaf through the factory to the tasting room. Most estates here are working ones, not museums.",
        },
        {
          title: "Horton Plains at first light",
          body: "A high plateau of grassland and cloud forest, and a walk out to World’s End, where the land drops away. Leave before six to beat the mist.",
        },
        {
          title: "The train down to Ella",
          body: "Three hours or so through the tea, on one of the best stretches of railway anywhere. We book the seats and meet you at the other end.",
        },
        {
          title: "An afternoon by the fire",
          body: "The evenings are cold enough for one. The bungalows we use have a garden, a few shelves of books and very little else to do.",
        },
      ],
    },
    gallery: [
      { src: shots.teaPickers, alt: "Tea pickers among the bushes on a hillside estate" },
      { src: shots.teaMist, alt: "Tea bushes on a misty hillside" },
    ],
    season:
      "The hills have their own weather. January to March is the clearest, with cold nights and bright mornings. The rest of the year is milder and mistier, and rain is most likely from October to December. Pack a jumper whatever the month.",
    nearby: { heading: "On the way in, and the way down.", slugs: ["kandy", "ella", "yala"] },
    ctaBody: "Tell us your dates and we will fit it in, with a bungalow out on an estate.",
  },
  {
    slug: "ella",
    name: "Ella",
    region: "hill",
    line: "A small hill town with walks from the door and the train running through.",
    image: {
      src: images.teaEstate,
      alt: "A blue train crossing the Nine Arch Bridge through the trees",
    },
    map: { cx: 246.0, cy: 499.0, tx: 258.0, ty: 503.5, anchor: "start" },
    journeyStop: "ella",
    summary:
      "A small town in a gap in the hills, with the railway running through it and walks that start at the front door.",
    nights: "2 nights",
    goodFor: "Walkers, families",
    intro: {
      heading: "A town for walking.",
      paragraphs: [
        "Ella is a single street of cafés and guesthouses in a gap between two ridges, looking south over the lowlands. The train from Kandy and Nuwara Eliya stops here, and most people arrive on it.",
        "It is busier than it was, but the walking has not changed. Little Adam’s Peak, Ella Rock and the Nine Arch Bridge are all within reach on foot, so the car can stay parked for a day or two.",
      ],
    },
    mapCaption: `On the southern edge of the hill country. ${PAIR_CAPTION}`,
    doing: {
      lede: "Ella is best on foot. These are the things we build the days around.",
      items: [
        {
          title: "Little Adam’s Peak at sunrise",
          body: "An easy climb of under an hour, up through the tea to a ridge with the valley below. Worth the alarm.",
        },
        {
          title: "The Nine Arch Bridge",
          body: "A stone viaduct in the trees, a short walk from town. We check the timetable so you are there when a train crosses.",
        },
        {
          title: "Ella Rock for a longer day",
          body: "A proper half-day hike along the railway line and up through forest, with a guide who knows the turns.",
        },
        {
          title: "Arriving by train",
          body: "The line from Nuwara Eliya is the best of the hill country railway. We book the seats and have the car waiting at the station.",
        },
      ],
    },
    gallery: [
      { src: shots.ellaLookout, alt: "Hills and a valley from a wooden lookout" },
      { src: shots.ellaWaterfall, alt: "A waterfall in the forested hills" },
    ],
    season:
      "Ella follows the hill country: driest from January to March, green and showery at the end of the year. It sits lower than Nuwara Eliya, so the evenings are mild rather than cold.",
    nearby: { heading: "Down from the hills.", slugs: ["nuwara-eliya", "yala", "udawalawe"] },
    ctaBody: "Tell us your dates and we will fit it in, with the train booked for the way in.",
  },

  /* Cultural Triangle -------------------------------------------------------------- */
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "triangle",
    line: "The rock fortress, and the quieter climb opposite that looks back at it.",
    image: { src: shots.sigiriyaRock, alt: "Sigiriya rock rising out of the forest" },
    map: { cx: 196.1, cy: 322.4, tx: 196.1, ty: 308.4, anchor: "middle" },
    journeyStop: "sigiriya",
    summary:
      "A fifth-century palace on top of a 180 metre rock, and the best base for the Cultural Triangle.",
    nights: "3 nights",
    goodFor: "First visits, families",
    intro: {
      heading: "A palace on a rock.",
      paragraphs: [
        "King Kashyapa built his palace on the summit of Sigiriya in the fifth century, with water gardens at its foot and painted women on the rock face halfway up. It is a UNESCO World Heritage Site and the most visited place on the island.",
        "We climb it at opening time, before the heat and the coaches, and keep Pidurangala, the rock opposite, for a sunrise. Three nights here leaves time for Dambulla, Polonnaruwa and an elephant drive without hurrying any of them.",
      ],
    },
    mapCaption: `In the dry north of the Cultural Triangle. ${PAIR_CAPTION}`,
    doing: {
      lede: "Sigiriya is a base as much as a sight. These are the things we build the days around.",
      items: [
        {
          title: "The rock at opening time",
          body: "Some twelve hundred steps, the frescoes and the lion’s paws, and the summit before nine. After that it is hot and crowded.",
        },
        {
          title: "Pidurangala at sunrise",
          body: "A shorter, rougher climb to a boulder top with Sigiriya straight ahead. Quieter, and the better view of the two.",
        },
        {
          title: "An elephant drive",
          body: "From July to September, hundreds of elephants gather on the grass by the Minneriya reservoir. Earlier in the year we use Kaudulla or Eco Park instead.",
        },
        {
          title: "A village afternoon",
          body: "Lunch cooked in a farmhouse kitchen, a bullock cart and a canoe across the tank. Simple, and children love it.",
        },
      ],
    },
    gallery: [
      { src: shots.sigiriyaFromAbove, alt: "The ruins on the summit of Sigiriya from above" },
      { src: images.scenic, alt: "Two travellers looking across the forest to Sigiriya rock" },
    ],
    season:
      "The Cultural Triangle is dry for most of the year and at its best from February to April. It gets hot, so we keep the climbs for early morning whatever the month. October and November bring the heaviest rain.",
    nearby: { heading: "Around the Triangle.", slugs: ["dambulla", "polonnaruwa", "kandy"] },
    ctaBody:
      "Tell us your dates and we will fit it in, with the climb planned for the coolest hour.",
  },
  {
    slug: "dambulla",
    name: "Dambulla",
    region: "triangle",
    line: "Cave temples under a single rock, painted floor to ceiling.",
    image: {
      src: shots.dambullaCave,
      alt: "A seated Buddha before painted walls in a cave temple",
      position: "50% 30%",
    },
    map: { cx: 177.2, cy: 338.6, tx: 165.2, ty: 343.1, anchor: "end" },
    journeyStop: "dambulla",
    summary:
      "Five cave temples under one granite outcrop, filled with statues and painted from floor to ceiling. An hour here stays with people for years.",
    nights: "Half a day",
    goodFor: "Culture, photographers",
    intro: {
      heading: "Caves full of paint.",
      paragraphs: [
        "The cave temples at Dambulla have been a place of worship for more than two thousand years. Inside five caves under an overhanging rock there are over 150 statues of the Buddha, and nearly every surface above them is painted.",
        "It is twenty minutes from Sigiriya, so we do not move hotels for it. We go early or late, when the light is low and the caves are quiet, and leave time for the walk up and down the rock.",
      ],
    },
    mapCaption: `At the southern edge of the Cultural Triangle. ${PAIR_CAPTION}`,
    doing: {
      lede: "Dambulla is a morning, not a stay. These are the things we build it around.",
      items: [
        {
          title: "The five caves",
          body: "Start in the largest, the Temple of the Great King, and work outward. Shoes off at the gate, shoulders and knees covered.",
        },
        {
          title: "The walk up the rock",
          body: "Around fifteen minutes of steps, with monkeys for company and a view over the plains from the top.",
        },
        {
          title: "A spice garden on the way",
          body: "The road towards Kandy passes several. We choose one that grows what it shows you, rather than one that only sells.",
        },
        {
          title: "Lunch in a village",
          body: "Rice and curry cooked over wood, at a family house a few minutes off the main road.",
        },
      ],
    },
    gallery: [
      { src: pkg.daveTemple, alt: "A Buddha statue lit against murals deep inside a cave" },
      { src: images.sacredPlaces, alt: "Seated Buddha statues inside a painted cave temple" },
    ],
    season:
      "Dambulla follows the Cultural Triangle: dry for most of the year and at its best from February to April. Inside the caves it is cool in any month, but the climb up is hot by late morning.",
    nearby: { heading: "Around the Triangle.", slugs: ["sigiriya", "polonnaruwa", "kandy"] },
    ctaBody: "Tell us your dates and we will fit it in, on the quietest morning of your stay.",
  },
  {
    slug: "polonnaruwa",
    name: "Polonnaruwa",
    region: "triangle",
    line: "A medieval royal city, flat enough to see by bicycle.",
    image: {
      src: images.noteFamily,
      alt: "The carved moonstone and steps of the Polonnaruwa Vatadage at dusk",
    },
    map: { cx: 237.0, cy: 325.0, tx: 249.0, ty: 329.5, anchor: "start" },
    summary:
      "The island’s medieval capital, spread through shady parkland. We see it by bicycle, one ruin at a time.",
    nights: "A day",
    goodFor: "Families, cyclists",
    intro: {
      heading: "A city you can cycle.",
      paragraphs: [
        "Polonnaruwa was the royal capital around nine hundred years ago. Its palaces, temples and stupas are spread over several kilometres of flat, shaded parkland beside a huge reservoir built by King Parakramabahu.",
        "It is an hour from Sigiriya, so we treat it as a day out. Bicycles and a guide at the gate, an early start, and the stone Buddhas of the Gal Vihara saved for last.",
      ],
    },
    mapCaption: `In the east of the Cultural Triangle. ${PAIR_CAPTION}`,
    doing: {
      lede: "Polonnaruwa is a morning on two wheels. These are the things we build the day around.",
      items: [
        {
          title: "The ruins by bicycle",
          body: "Flat paths, shade most of the way, and a guide riding with you. We stop at the Quadrangle, the royal palace and the lotus pond.",
        },
        {
          title: "The Gal Vihara",
          body: "Four Buddhas cut into a single granite face, one of them fourteen metres long and lying down. The finest carving on the island.",
        },
        {
          title: "The reservoir at dusk",
          body: "Parakrama Samudra is big enough to look like a lake. Families come down to the bund to swim and watch the light go.",
        },
        {
          title: "Elephants at Minneriya",
          body: "The national park is half an hour away. From July to September the gathering there is one of the great wildlife sights of Asia.",
        },
      ],
    },
    gallery: [
      { src: shots.minneriyaElephants, alt: "Elephants grazing on open grassland at Minneriya" },
      { src: shots.polonnaruwaRuins, alt: "Stone ruins among the trees at Polonnaruwa" },
    ],
    season:
      "Polonnaruwa follows the Cultural Triangle: dry for most of the year and at its best from February to April. The Minneriya gathering peaks in August and September, as the reservoir shrinks.",
    nearby: { heading: "Around the Triangle.", slugs: ["sigiriya", "dambulla", "trincomalee"] },
    ctaBody: "Tell us your dates and we will fit it in, with the bicycles waiting at the gate.",
  },

  /* South and west coast ----------------------------------------------------------- */
  {
    slug: "galle",
    name: "Galle",
    region: "southwest",
    line: "A walled fort town on the south coast, best after the day-trippers leave.",
    image: {
      src: pkg.yalaStay,
      alt: "A lit café street inside Galle Fort at night",
      position: "50% 45%",
    },
    map: { cx: 106.6, cy: 630.2, tx: 94.6, ty: 634.7, anchor: "end" },
    journeyStop: "galle",
    summary:
      "A walled fort town on the south coast. Busy at midday, quiet and golden by evening, and still lived in.",
    nights: "2 nights",
    goodFor: "Couples, first visits",
    intro: {
      heading: "A fort that is still a town.",
      paragraphs: [
        "Galle Fort was begun by the Portuguese and rebuilt by the Dutch in the seventeenth century. It is a UNESCO World Heritage Site now, but people still live, work and go to school inside the walls, and that is what makes it worth staying in rather than passing through.",
        "Most visitors come on a day trip from the beaches and leave by late afternoon. We book a night or two inside the walls, so you have the ramparts at sunset and the lanes to yourself in the morning.",
      ],
    },
    mapCaption: `On the south western corner of the island. ${PAIR_CAPTION}`,
    doing: {
      lede: "Galle is best taken slowly. These are the things we build the days around.",
      items: [
        {
          title: "The ramparts at sunset",
          body: "Walk the walls from the clock tower round to the lighthouse as the light goes. Half the town does the same, and it never feels crowded.",
        },
        {
          title: "The lanes before breakfast",
          body: "Churches, a mosque, old Dutch houses and the first cafés opening, while the streets are still being swept.",
        },
        {
          title: "A day on the nearby beaches",
          body: "Unawatuna and the quieter coves beyond it are a short drive east when you want to swim.",
        },
        {
          title: "Dinner inside the walls",
          body: "Restaurants in restored houses, all a few minutes’ walk from wherever you are staying.",
        },
      ],
    },
    gallery: [
      { src: pkg.galleFort, alt: "A lone walker on an empty stretch of the south coast" },
      { src: images.honeymoon, alt: "A table set on the sand as a couple walk the beach" },
    ],
    season:
      "Galle follows the south and west coast: dry and calm from December to April, wet while the south west monsoon blows from May to September. Whales pass Mirissa, a short drive east, from November to April.",
    journeysHeading: "Journeys that end in Galle.",
    nearby: { heading: "Along the same coast.", slugs: ["mirissa", "tangalle", "bentota"] },
    ctaBody: "Tell us your dates and we will fit it in, with a room inside the walls.",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "southwest",
    line: "A bay for whale watching from November to April, and slow evenings after.",
    image: { src: images.cloudForest, alt: "Palms on a red headland above the sea at Mirissa" },
    map: { cx: 144.5, cy: 641.5, tx: 144.5, ty: 664.5, anchor: "middle" },
    summary:
      "A small bay on the south coast, and the best place on the island to go looking for blue whales.",
    nights: "2 nights",
    goodFor: "Couples, wildlife",
    intro: {
      heading: "Whales, then a slow evening.",
      paragraphs: [
        "Mirissa is a curve of sand with a fishing harbour at one end. From November to April, blue whales and sperm whales pass close to the south coast, and the boats go out from here at dawn.",
        "The beach itself has filled up with bars over the years. We book stays on the quieter headlands either side, so the whale morning is followed by a long lunch and not much else.",
      ],
    },
    mapCaption: `On the south coast, east of Galle. ${PAIR_CAPTION}`,
    doing: {
      lede: "Mirissa is a morning at sea and an afternoon off. These are the things we build the days around.",
      items: [
        {
          title: "A whale watching morning",
          body: "Out at six, back by lunch. We use operators who keep their distance from the whales, and we only go in season.",
        },
        {
          title: "Coconut Tree Hill",
          body: "A red headland crowded with palms, a short walk from the beach. Best at the end of the day.",
        },
        {
          title: "A first surf lesson",
          body: "The small waves at the western end of the bay suit beginners. Boards and a patient instructor are easy to find.",
        },
        {
          title: "Fish on the beach at night",
          body: "The day’s catch laid out on ice along the sand. Pick one, and it is grilled while you wait.",
        },
      ],
    },
    gallery: [
      { src: shots.weligamaHeadland, alt: "A headland and bay on the south coast from the air" },
      { src: images.quietStop, alt: "A walker among the palms on a red headland above the sea" },
    ],
    season:
      "Mirissa follows the south coast: calm and dry from December to April, rough and wet while the south west monsoon blows from May to September. The whales are here from November to April.",
    nearby: { heading: "Along the same coast.", slugs: ["galle", "tangalle", "yala"] },
    ctaBody: "Tell us your dates and we will fit it in, with the whale morning in the right month.",
  },
  {
    slug: "tangalle",
    name: "Tangalle",
    region: "southwest",
    line: "Long, quiet beaches at the far end of the south coast.",
    image: { src: images.southCoast, alt: "A couple walking a palm-lined beach at sunset" },
    map: { cx: 201.2, cy: 628.6, tx: 213.2, ty: 633.1, anchor: "start" },
    journeyStop: "tangalle",
    summary:
      "Long, empty beaches at the far end of the south coast, and the easiest place on the island to do nothing for a few days.",
    nights: "3 nights",
    goodFor: "Couples, honeymoons",
    intro: {
      heading: "The quiet end of the coast.",
      paragraphs: [
        "East of Mirissa the south coast empties out. Tangalle is a small market town with long beaches either side of it, many of them backed by nothing but palms and a handful of villas.",
        "This is where we end a lot of journeys. After the hills and the parks, three nights here with nowhere to be is often what people remember most fondly. Yala is close enough for a day, if you want one.",
      ],
    },
    mapCaption: `Towards the eastern end of the south coast. ${PAIR_CAPTION}`,
    doing: {
      lede: "Tangalle is a place to slow down. These are the things we build the days around, when there is anything at all.",
      items: [
        {
          title: "A different beach each day",
          body: "Goyambokka, Silent Beach, Rekawa and Marakolliya are all a short tuk-tuk ride apart, and none of them is ever busy.",
        },
        {
          title: "Turtles at Rekawa",
          body: "Green turtles come ashore to nest on most nights of the year. A local conservation project watches the beach and calls you when one arrives.",
        },
        {
          title: "The rock temple at Mulkirigala",
          body: "Cave shrines stacked up a rock inland, quieter than Dambulla and a good morning’s climb.",
        },
        {
          title: "Long lunches",
          body: "Grilled fish, a cold drink and a hammock. We choose stays that are good at all three.",
        },
      ],
    },
    gallery: [
      { src: shots.beachWalk, alt: "A lone walker on a wide, empty beach" },
      { src: shots.reefFromAbove, alt: "Palms, sand and reef from above" },
    ],
    season:
      "Tangalle follows the south coast: at its best from December to April, and wet from May to September. The sea is rough in the monsoon months, so swimming is for the dry season.",
    nearby: { heading: "Along the same coast.", slugs: ["mirissa", "galle", "yala"] },
    ctaBody:
      "Tell us your dates and we will fit it in, with a few days at the end with nothing planned.",
  },
  {
    slug: "bentota",
    name: "Bentota",
    region: "southwest",
    line: "River and beach within easy reach of the airport, for a first or last night.",
    image: { src: images.honeymoon, alt: "A table set on the sand as a couple walk the beach" },
    map: { cx: 68.8, cy: 571.9, tx: 56.8, ty: 576.4, anchor: "end" },
    summary:
      "A river, a long beach and good hotels, about two hours from the airport. The easy first or last night.",
    nights: "1 or 2 nights",
    goodFor: "Arrivals, departures",
    intro: {
      heading: "An easy start, or an easy finish.",
      paragraphs: [
        "Bentota is where the Bentota river meets the sea, on the west coast south of Colombo. There is a long beach on the ocean side, a calm lagoon on the other, and some of the island’s best-run beach hotels between them.",
        "Many long-haul flights land late at night or leave early in the morning. A night here rather than in the city means you start or finish the trip by the sea, without a long drive in either direction.",
      ],
    },
    mapCaption: `On the west coast, south of Colombo. ${PAIR_CAPTION}`,
    doing: {
      lede: "Bentota is for recovering from a flight, or resting before one. These are the things we fill the time with.",
      items: [
        {
          title: "A boat up the river",
          body: "Mangroves, water monitors and kingfishers, on a slow boat from the jetty, with a stop at a cinnamon garden.",
        },
        {
          title: "Lunuganga",
          body: "Geoffrey Bawa’s country estate on the lake, and the garden he spent fifty years shaping. Open for guided visits.",
        },
        {
          title: "Brief Garden",
          body: "The house and garden of his brother Bevis, a short drive inland, with the sculpture and the planting much as he left them.",
        },
        {
          title: "A day on the lagoon",
          body: "Kayaks, paddleboards or nothing at all, on water that stays calm when the sea is rough.",
        },
      ],
    },
    season:
      "Bentota is on the west coast, so it follows the south and west: at its best from December to April, and wet from May to September. The river and the lagoon are good in any month.",
    nearby: { heading: "Along the same coast.", slugs: ["galle", "mirissa", "tangalle"] },
    ctaBody: "Tell us your flight times and we will put it at the start or the end of the route.",
  },

  /* East coast --------------------------------------------------------------------- */
  {
    slug: "trincomalee",
    name: "Trincomalee",
    region: "east",
    line: "A deep harbour, calm water and empty beaches when the south is wet.",
    image: {
      src: shots.quietBay,
      alt: "A long, quiet beach with clear water and palms",
      position: "50% 70%",
    },
    map: { cx: 276.9, cy: 221.9, tx: 288.9, ty: 226.4, anchor: "start" },
    locatorAnchor: "end",
    summary:
      "A deep natural harbour on the north east coast, with calm water and empty beaches in the months the south is wet.",
    nights: "3 nights",
    goodFor: "Families, snorkellers",
    intro: {
      heading: "The other coast.",
      paragraphs: [
        "Trincomalee has one of the largest natural harbours in the world, and a small, busy town around it. North of the town, the beaches at Uppuveli and Nilaveli run for miles, with warm, shallow water and very few people.",
        "From May to September, while the south west monsoon soaks the other coast, the sea here is flat and clear. That is when we send people east: to swim, to snorkel off Pigeon Island, and to go out looking for whales and dolphins.",
      ],
    },
    mapCaption: `On the north east coast. ${PAIR_CAPTION}`,
    doing: {
      lede: "Trincomalee is for the months the south is wet. These are the things we build the days around.",
      items: [
        {
          title: "Snorkelling at Pigeon Island",
          body: "A small marine park off Nilaveli, with reef, turtles and blacktip reef sharks in shallow water. Go early, before the boats.",
        },
        {
          title: "Koneswaram temple",
          body: "A Hindu temple on Swami Rock, high above the sea at the end of the old fort. The view is as much the reason to go as the shrine.",
        },
        {
          title: "Whales and dolphins",
          body: "Blue whales pass close to this coast from around March to August, and dolphins are about for most of the season.",
        },
        {
          title: "Nilaveli beach",
          body: "Miles of soft sand and warm water with almost nobody on it. The best swimming on the island in July.",
        },
      ],
    },
    season:
      "The east coast runs the other way to the south: calm and dry from May to September, and wet while the north east monsoon blows from November to January. It is the answer to a summer trip.",
    nearby: {
      heading: "Nearby, and on the way.",
      slugs: ["arugam-bay", "polonnaruwa", "sigiriya"],
    },
    ctaBody:
      "Tell us your dates. If they fall in the summer, we will build the route around this coast.",
  },
  {
    slug: "arugam-bay",
    name: "Arugam Bay",
    region: "east",
    line: "A surf town on the east coast, with the season starting in June.",
    image: {
      src: shots.reefFromAbove,
      alt: "Waves breaking over the reef below a palm-lined beach",
      position: "50% 40%",
    },
    map: { cx: 375.0, cy: 503.8, tx: 387.0, ty: 508.3, anchor: "start" },
    locatorAnchor: "end",
    summary:
      "A surf town low on the east coast, with a long point break and a season that runs through the northern summer.",
    nights: "3 nights",
    goodFor: "Surfers, young couples",
    intro: {
      heading: "A surf town, and quieter bays beyond.",
      paragraphs: [
        "Arugam Bay is one road of guesthouses and cafés behind a curve of sand, with a right-hand point break at the southern end that surfers travel a long way for. The season runs from about May to October.",
        "It is relaxed, and busy in season, which suits some people more than others. We use it as a base for the quieter breaks and lagoons further south, and for Kumana, the national park most visitors never reach.",
      ],
    },
    mapCaption: `Low on the south east coast. ${PAIR_CAPTION}`,
    doing: {
      lede: "Arugam Bay runs on the surf and the tides. These are the things we build the days around.",
      items: [
        {
          title: "The point at dawn",
          body: "The main break is best early, before the wind picks up. Beginners learn on the gentler waves at Baby Point.",
        },
        {
          title: "Kumana National Park",
          body: "Birds in huge numbers around the lagoons, elephants, and the odd leopard, without the jeeps of Yala.",
        },
        {
          title: "The lagoon by canoe",
          body: "Pottuvil lagoon at first light, through the mangroves, with herons and the occasional crocodile for company.",
        },
        {
          title: "Muhudu Maha Viharaya",
          body: "An old temple half buried in the dunes at Pottuvil, a short ride north of the bay.",
        },
      ],
    },
    season:
      "Arugam Bay follows the east coast. The surf and the weather are best from June to September, and many places close from November to March, when the north east monsoon arrives.",
    nearby: { heading: "Nearby, and on the way.", slugs: ["trincomalee", "yala", "ella"] },
    ctaBody:
      "Tell us your dates and whether you surf, and we will build the rest of the route around the season.",
  },

  /* National parks ----------------------------------------------------------------- */
  {
    slug: "yala",
    name: "Yala",
    region: "parks",
    line: "Leopard country. The park usually closes for a few weeks around September.",
    image: {
      src: pkg.sigiriyaStay,
      alt: "A safari jeep waiting under a tree on a red dirt track",
      position: "50% 60%",
    },
    map: { cx: 309.6, cy: 571.9, tx: 321.6, ty: 576.4, anchor: "start" },
    journeyStop: "yala",
    summary:
      "Scrub, lagoons and rocky outcrops on the south east coast, and one of the best chances of seeing a leopard anywhere.",
    nights: "2 nights",
    goodFor: "Wildlife, families",
    intro: {
      heading: "Leopard country.",
      paragraphs: [
        "Yala has one of the highest densities of leopards in the world, along with elephants, sloth bears, crocodiles and more birds than most people can name. The park runs down to the sea, and its dry scrub, water holes and huge boulders are worth the drive on their own.",
        "It is also busy. We book two drives with guides who know how to avoid the crowds, go out as the gates open and again in the late afternoon, and stay close enough to rest in the middle of the day.",
      ],
    },
    mapCaption: `In the dry south east. ${PAIR_CAPTION}`,
    doing: {
      lede: "Yala is planned around the hours the animals are out. These are the things we build the days around.",
      items: [
        {
          title: "A drive at first light",
          body: "The gates open at six, and the first hour is the best of the day. Leopards are never promised, only made likely.",
        },
        {
          title: "An afternoon drive",
          body: "Back out in the late afternoon, when the animals come down to the water. The light is kinder for photographs too.",
        },
        {
          title: "Sithulpawwa",
          body: "A rock temple inside the wider park, where monks have lived and prayed for more than two thousand years.",
        },
        {
          title: "Kirinda and the coast",
          body: "A temple on a rock above the sea, and a beach with nobody on it, between drives.",
        },
      ],
    },
    gallery: [
      { src: images.wildlifePackage, alt: "A leopard crossing the track ahead of a safari jeep" },
      { src: shots.yalaLeopard, alt: "A leopard walking over dry ground" },
    ],
    season:
      "Yala is dry for most of the year and at its best from February to August, when the water holes shrink and the animals gather at them. The park usually closes for a few weeks from September into October.",
    nearby: { heading: "Near the park.", slugs: ["udawalawe", "tangalle", "ella"] },
    ctaBody:
      "Tell us your dates and we will book the drives, with guides who know when the animals are out.",
  },
  {
    slug: "udawalawe",
    name: "Udawalawe",
    region: "parks",
    line: "Open grassland and elephants, and a good first safari for children.",
    image: {
      src: shots.udawalaweElephants,
      alt: "Elephants grazing on open grassland under the hills",
    },
    map: { cx: 216.7, cy: 558.9, tx: 228.7, ty: 563.4, anchor: "start" },
    summary:
      "Open grassland around a reservoir, with several hundred elephants and a first safari that almost never disappoints.",
    nights: "1 night",
    goodFor: "Families, first safaris",
    intro: {
      heading: "Elephants, every time.",
      paragraphs: [
        "Udawalawe is flatter and more open than Yala: grassland and scrub around a large reservoir at the foot of the hills. Several hundred elephants live here, and you are all but certain to see them, often close to the jeep.",
        "That makes it the park we suggest for children and for a first safari. It sits between the hills and the south coast, so it breaks up a long drive, and the elephant transit home beside the park is worth an hour.",
      ],
    },
    mapCaption: `Between the hills and the south coast. ${PAIR_CAPTION}`,
    doing: {
      lede: "Udawalawe is a half day, not a week. These are the things we build it around.",
      items: [
        {
          title: "An afternoon drive",
          body: "Three or four hours in an open jeep, with elephants at the water, buffalo, crocodiles and eagles overhead.",
        },
        {
          title: "The elephant transit home",
          body: "Orphaned calves are raised here and later released into the park. Feeding time is short, and kept at a distance.",
        },
        {
          title: "The reservoir from the dam",
          body: "The road along the dam looks out over the water, and elephants often come down to drink below it.",
        },
        {
          title: "Birds, for the keen",
          body: "Bee-eaters, fish eagles and more than two hundred other species. We can book a guide who cares more about them than the elephants.",
        },
      ],
    },
    gallery: [
      { src: shots.udawalaweJeep, alt: "An elephant beside a safari jeep on the grassland" },
      {
        src: images.littleOnes,
        alt: "A child in a safari jeep watching an elephant in the long grass",
      },
    ],
    season:
      "Udawalawe has no long closure, and the elephants stay whatever the month. February to August is the driest time, and the easiest for seeing them at the water.",
    nearby: { heading: "Near the park.", slugs: ["yala", "ella", "tangalle"] },
    ctaBody:
      "Tell us your dates and we will fit a drive in on the way from the hills to the coast.",
  },
];

export const placeSlugs = places.map((p) => p.slug);
export const placeBySlug = Object.fromEntries(places.map((p) => [p.slug, p])) as Record<
  string,
  Place
>;

export const placesHero = {
  title: "Places we know well",
  body: "The towns, hills, parks and beaches our journeys pass through, what each one is really for, and the months it is at its best.",
  image: shots.sigiriyaRock,
  alt: "Sigiriya rock rising out of the forest",
};

export const placesMap = {
  heading: "Five parts of one small island.",
  lede: "Each region has its own weather and its own season. Pick one to see where it sits, and the places below narrow to match.",
  /** Under the region list when nothing is picked. */
  blurb:
    "Two monsoons take turns, so some part of the island is always in season. Pick a region to see its months.",
};

export const placesGrid = { heading: "Every place we send people." };
