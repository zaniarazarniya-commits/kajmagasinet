import type { Loc } from "@/lib/i18n";

export const SITE = {
  name: "Kajmagasinet",
  tagline: "Restaurang och bar",
  address: "Rosviksgatan 1, 453 30 Lysekil",
  streetAddress: "Rosviksgatan 1",
  postalCode: "453 30",
  city: "Lysekil",
  /** Visningsformat; använd `phoneTel` i tel:-länkar (E.164). */
  phone: "076-716 04 24",
  phoneTel: "+46767160424",
  email: "kajmagasinet@gmail.com",
  instagram: "https://www.instagram.com/kajmagasinet",
  instagramHandle: "@kajmagasinet",
  geo: { latitude: 58.2730708, longitude: 11.4363266 },
  /** Inbäddad karta i kontaktsektionen. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rosviksgatan%201,%20453%2030%20Lysekil&output=embed",
  /** Vägbeskrivning — gästen ska inte behöva markera adressen själv. */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Rosviksgatan+1,+453+30+Lysekil",
  mapsUrl:
    "https://www.google.com/maps/place/Kajmagasinet/@58.2730708,11.4363266,18z",
  bookingUrl: "/#boka",
} as const;

/**
 * Bilder. Alla är kundens egna foton.
 * Heroordningen är medveten: den ljusa vattenbilden måste ligga först,
 * annars läser hero som en platt marinblå yta.
 */
export const IMAGES = {
  heroSlides: [
    {
      src: "/images/miljo/terrass-blaa-timmen.png",
      alt: {
        sv: "Trädäcket vid vattnet i blå timmen",
        en: "The wooden deck by the water at blue hour",
      },
    },
    {
      src: "/images/miljo/fasad-skylt-skymning.jpeg",
      alt: {
        sv: "Kajmagasinets fasad med upplyst skylt i skymningen",
        en: "The Kajmagasinet facade with its lit sign at dusk",
      },
    },
    {
      src: "/images/miljo/kajen-solnedgang.jpeg",
      alt: {
        sv: "Solnedgång över kajen i Lysekil",
        en: "Sunset over the quay in Lysekil",
      },
    },
  ],
  portrait: {
    src: "/images/team/duo-baren.jpeg",
    alt: {
      sv: "Personalen bakom baren på Kajmagasinet",
      en: "The team behind the bar at Kajmagasinet",
    },
  },
  aboutMini: [
    {
      src: "/images/miljo/entre-sommardag.jpeg",
      alt: { sv: "Kajmagasinets entré en sommardag", en: "The entrance on a summer day" },
    },
    {
      src: "/images/miljo/tradack-skymning.png",
      alt: { sv: "Trädäcket i skymningen", en: "The deck at dusk" },
    },
  ],
  menuPhoto: {
    src: "/images/gallery/servering/image%20(7).jpg",
    alt: {
      sv: "Bohuslänsk fisksoppa med havskräfta",
      en: "Bohuslän fish soup with langoustine",
    },
  },
  winePhoto: {
    src: "/images/team/bartender-spritz.jpeg",
    alt: { sv: "Bartender mixar drinkar i baren", en: "Bartender mixing drinks at the bar" },
  },
  houseSlides: [
    "/images/team/tomtebloss.jpeg",
    "/images/miljo/tradack-skymning.png",
    "/images/miljo/entre-kvall.jpeg",
  ],
  ogImage: "/images/brand/og-image.jpg",
  logo: "/images/brand/icon-512.png",
} as const;

/** En drink i karusellen (CMS eller fallback nedan). */
export type DrinkItem = {
  slug: string;
  name: string;
  /** Smakprofil — visas som piller. Inte ett löpnummer: gästen ska få veta något. */
  taste: Loc;
  description: Loc;
  image: string;
};

/**
 * Husets drinkar. Bilderna är kontrollerade mot rätt drink — byts en bild ut
 * måste kopplingen bild/namn verifieras igen, gästen läser bilden först.
 * Används när inget finns i Sanity.
 */
export const DRINKS: DrinkItem[] = [
  {
    slug: "mc",
    name: "MC",
    taste: { sv: "Sötsur", en: "Sweet & sour" },
    description: {
      sv: "Blåbärsvodka, blåbärsliqueur & Red Bull Blåbär.",
      en: "Blueberry vodka, blueberry liqueur & Red Bull Blue.",
    },
    image: "/images/drinks/mc-blabar.jpeg",
  },
  {
    slug: "verana-raspberry",
    name: "Verana Raspberry",
    taste: { sv: "Söt", en: "Sweet" },
    description: {
      sv: "Hallonliqueur & hallonrom — uppfriskande sött.",
      en: "Raspberry liqueur & raspberry rum — refreshingly sweet.",
    },
    image: "/images/drinks/verana-hallon.jpeg",
  },
  {
    slug: "p-p",
    name: "P-P",
    taste: { sv: "Sursöt", en: "Sour & sweet" },
    description: {
      sv: "Vodka, passionsliqueur & passionssyrup.",
      en: "Vodka, passionfruit liqueur & passionfruit syrup.",
    },
    image: "/images/drinks/pp-passion.jpeg",
  },
  {
    slug: "dr-love",
    name: "Dr Love",
    taste: { sv: "Söt", en: "Sweet" },
    description: {
      sv: "Ljus rom & Peachtree — mjuk persikosmak.",
      en: "Light rum & Peachtree — soft peach.",
    },
    image: "/images/drinks/drlove-persika.jpeg",
  },
  {
    slug: "weewee",
    name: "WeeWee",
    taste: { sv: "Vattenmelon", en: "Watermelon" },
    description: {
      sv: "Vodka vattenmelon & vattenmelonliqueur.",
      en: "Watermelon vodka & watermelon liqueur.",
    },
    image: "/images/drinks/weewee-vattenmelon.jpeg",
  },
  {
    slug: "alkoholfri-drink",
    name: "Alkoholfri drink",
    taste: { sv: "69:-", en: "69:-" },
    description: {
      sv: "Säg vad du gillar — baren mixar något gott utan alkohol.",
      en: "Tell us what you like — the bar will mix something good, alcohol free.",
    },
    image: "/images/drinks/alkoholfri.jpeg",
  },
];
