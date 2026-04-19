export const SITE = {
  name: "Kajmagasinet",
  tagline: "Restaurang och bar",
  address: "Rosviksgatan 1, 453 30 Lysekil",
  /** Visningsformat; använd `phoneTel` i tel:-länkar (E.164). */
  phone: "076-716 04 24",
  phoneTel: "+46767160424",
  email: "kajmagasinet@gmail.com",
  instagram: "https://www.instagram.com/kajmagasinet",
  /** Pin mot rätt läge (samma som Google Maps ”Kajmagasinet” vid Rosviksgatan). */
  mapsUrl:
    "https://www.google.com/maps/place/Kajmagasinet/@58.2730708,11.4363266,18z",
  bookingUrl: "#boka",
} as const;

export const OPENING_HOURS = [
  { day: "Måndag – Torsdag", time: "11:00 – 23:00" },
  { day: "Fredag – Lördag", time: "11:00 – 01:00" },
  { day: "Söndag", time: "12:00 – 22:00" },
] as const;

export const MENU_CATEGORIES = [
  {
    id: "mat",
    title: "Köket",
    description: "Säsong, närodlat och enkel teknik",
    items: [
      "Dagens rätt från säsongens lista",
      "Smörstekt pilgrimsmussla med örter",
      "Burgare med ost från närbelägen gård",
      "Förrätt och varmrätt enligt veckomeny",
    ],
  },
  {
    id: "cocktails",
    title: "Baren",
    description: "Klassiska drinkar och hantverksöl",
    items: [
      "Gin & tonic med ört och citrus",
      "Mörk rom, lime och ingefära",
      "Whisky sour",
      "Alkoholfritt med bär och ört",
    ],
  },
  {
    id: "dryck",
    title: "Källaren",
    description: "Öl, vin och mousserande",
    items: [
      "Lokala fat och flasköl",
      "Vinlista med naturvin och klassiker",
      "Mousserande till maten",
      "Alkoholfritt utbud",
    ],
  },
] as const;

/** En drink i karusellen (CMS eller fallback nedan). */
export type DrinkItem = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

/**
 * Drinkar som visas i karusellen på startsidan.
 * När innehåll finns i Sanity används det i stället; detta är reserv.
 */
/** Standardlista 1–10 (samma ordning som i Sanity ”Drinkar”). Bilder: se public/images/drinks/BILDER-LAS-MIG.md */
export const DRINKS: DrinkItem[] = [
  {
    slug: "hallon-timjan-collins",
    name: "Hallon & Timjan Collins",
    description:
      "Ljus rom, hallon, färsk timjan och kolsyrat vatten.",
    image: "/images/drinks/01-hallon-timjan-collins.png",
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon",
    description: "Vodka, blå curaçao, lime och krossad is.",
    image: "/images/drinks/07-blue-lagoon.png",
  },
  {
    slug: "espresso-martini",
    name: "Espresso Martini",
    description:
      "Vodka, kaffelikör, nybryggd espresso och ett krämigt skum.",
    image: "/images/drinks/03-espresso-martini.png",
  },
  {
    slug: "moscow-mule",
    name: "Moscow Mule",
    description:
      "Vodka, lime och ingefära, serveras iskall i klassisk kopparmugg.",
    image: "/images/drinks/10-moscow-mule.png",
  },
  {
    slug: "mango-daiquiri",
    name: "Mango Daiquiri",
    description:
      "Rom, len mangopuré och lime i en intensivt fruktig mix.",
    image: "/images/drinks/09-mango-daiquiri.png",
  },
  {
    slug: "klassisk-gin-tonic",
    name: "Klassisk Gin & Tonic",
    description: "Torr gin, premium tonic, färsk timjan och citronskal.",
    image: "/images/drinks/02-klassisk-gin-tonic.png",
  },
  {
    slug: "italienskt-rodvin",
    name: "Italienskt Rödvin",
    description:
      "Vårt eget direktimporterade vin från italienska Vogadori Vini.",
    image: "/images/drinks/04-italienskt-rodvin.png",
  },
  {
    slug: "strawberry-daiquiri",
    name: "Strawberry Daiquiri",
    description:
      "En frostig slushy med färska jordgubbar, lime och ljus rom.",
    image: "/images/drinks/05-strawberry-daiquiri.png",
  },
  {
    slug: "rom-cola",
    name: "Rom & Cola",
    description: "Mörk rom och cola med lime – en avslappnad klassiker.",
    image: "/images/drinks/06-rom-cola.png",
  },
  {
    slug: "pina-colada",
    name: "Piña Colada",
    description:
      "Ljus rom, kokos, färsk ananas och grädde för en krämig känsla.",
    image: "/images/drinks/08-pina-colada.png",
  },
];

/** Avsnittet "Från middag till häng" — socialt häng efter maten */
export const AFTER_MEAL = {
  subtitle:
    "Kvällen slutar inte när tallrikarna dukas av. Kajmagasinet är byggt för umgänge.",
  body:
    "Utmana kompisgänget i en match biljard eller dart, lyssna på livemusik under sommaren eller bara njut av stämningen. Vi har gott om plats för både stora sällskap och spontana besök. Det är helt enkelt ett ställe där det är roligt att vara.",
} as const;

/** Karusell: endast bilder. `empty` = synlig tom plats (ingen bild än). */
export type GalleryTile =
  | { id: string; empty: true }
  | { id: string; image: string; alt?: string };

export function isGalleryImageTile(
  tile: GalleryTile,
): tile is { id: string; image: string; alt?: string } {
  return "image" in tile && typeof tile.image === "string";
}

/** Bygger sökväg till fil under public/images/gallery/ (hanterar mellanslag i filnamn). */
export function galleryImagePath(folder: string, filename: string): string {
  return `/images/gallery/${folder}/${encodeURIComponent(filename)}`;
}

const g = galleryImagePath;

export const HERITAGE_GALLERY_TILES: GalleryTile[] = [
  { id: "heritage-01", image: g("om-oss", "image (1).jpg") },
  { id: "heritage-02", image: g("om-oss", "image (3) - Copy.jpg") },
  { id: "heritage-03", image: g("om-oss", "image (6).jpg") },
  { id: "heritage-04", image: g("om-oss", "image (7) - Copy.jpg") },
  { id: "heritage-05", image: g("om-oss", "image (8) - Copy.jpg") },
  { id: "heritage-06", image: g("om-oss", "image - Copy.jpg") },
  { id: "heritage-07", image: g("om-oss", "Snapchat-1028853774.jpg") },
  { id: "heritage-08", image: g("om-oss", "Snapchat-599691594.jpg") },
  { id: "heritage-09", image: g("om-oss", "Snapchat-784290965.jpg") },
  { id: "heritage-10", empty: true },
];

export const MENU_GALLERY_TILES: GalleryTile[] = [
  { id: "menu-01", image: g("servering", "image (2).jpg") },
  { id: "menu-02", image: g("servering", "image (3).jpg") },
  { id: "menu-03", image: g("servering", "image (4).jpg") },
  { id: "menu-04", image: g("servering", "image (5).jpg") },
  { id: "menu-05", image: g("servering", "image (6) - Copy.jpg") },
  { id: "menu-06", image: g("servering", "image (6).jpg") },
  { id: "menu-07", image: g("servering", "image (7).jpg") },
  { id: "menu-08", image: g("servering", "image (8).jpg") },
  { id: "menu-09", image: g("servering", "image (9).jpg") },
  { id: "menu-10", image: g("servering", "image.jpg") },
];

export const VIBE_GALLERY_TILES: GalleryTile[] = [
  { id: "vibe-01", image: g("huset", "dfs.jpg") },
  { id: "vibe-02", image: g("huset", "image (1).jpg") },
  { id: "vibe-03", image: g("huset", "image (2).jpg") },
  { id: "vibe-04", image: g("huset", "image (3).jpg") },
  { id: "vibe-05", image: g("huset", "image (5).jpg") },
  { id: "vibe-06", image: g("huset", "image.jpg") },
  { id: "vibe-07", image: g("huset", "Snapchat-730301977.jpg") },
  { id: "vibe-08", empty: true },
  { id: "vibe-09", empty: true },
  { id: "vibe-10", empty: true },
];
