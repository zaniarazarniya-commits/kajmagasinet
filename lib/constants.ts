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
export const DRINKS: DrinkItem[] = [
  {
    slug: "gin-tonic",
    name: "Gin & Tonic",
    description: "Torr gin, tonic, färsk timjan och citronskal.",
    image: "/images/drinks/gin-tonic.svg",
  },
  {
    slug: "dark-rum",
    name: "Mörk Rom",
    description: "Mörk rom, lime, ingefära och en skiva apelsin.",
    image: "/images/drinks/dark-rum.svg",
  },
  {
    slug: "whisky-sour",
    name: "Whisky Sour",
    description: "Bourbon, färskpressad citron, äggvita och angostura.",
    image: "/images/drinks/whisky-sour.svg",
  },
  {
    slug: "negroni",
    name: "Negroni",
    description: "Gin, campari och röd vermouth — rakt upp, apelsinskal.",
    image: "/images/drinks/negroni.svg",
  },
  {
    slug: "havets-spritz",
    name: "Havets Spritz",
    description: "Mousserande, fläderblom, citron och havssalt på kanten.",
    image: "/images/drinks/havets-spritz.svg",
  },
  {
    slug: "alkoholfri",
    name: "Alkoholfri Bärdrink",
    description: "Säsongens bär, tonic, basilika och en skvätt lime.",
    image: "/images/drinks/alkoholfri.svg",
  },
  {
    slug: "drink-07",
    name: "Drink 07",
    description: "Placeholder tills du lägger in egen drinkbild och text.",
    image: "/images/drinks/gin-tonic.svg",
  },
  {
    slug: "drink-08",
    name: "Drink 08",
    description: "Placeholder tills du lägger in egen drinkbild och text.",
    image: "/images/drinks/dark-rum.svg",
  },
  {
    slug: "drink-09",
    name: "Drink 09",
    description: "Placeholder tills du lägger in egen drinkbild och text.",
    image: "/images/drinks/whisky-sour.svg",
  },
  {
    slug: "drink-10",
    name: "Drink 10",
    description: "Placeholder tills du lägger in egen drinkbild och text.",
    image: "/images/drinks/negroni.svg",
  },
];

/** Avsnittet "Från middag till häng" — socialt häng efter maten */
export const AFTER_MEAL = {
  subtitle:
    "Kvällen slutar inte när tallrikarna dukas av. Kajmagasinet är byggt för umgänge.",
  body:
    "Utmana kompisgänget i en match biljard eller dart, lyssna på livemusik under sommaren eller bara njut av stämningen. Vi har gott om plats för både stora sällskap och spontana besök. Det är helt enkelt ett ställe där det är roligt att vara.",
} as const;

export type GalleryTile = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export const HERITAGE_GALLERY_TILES: GalleryTile[] = [
  { id: "heritage-01", title: "Utsikt över kajen", caption: "Här möts hav, kvällssol och bra stämning", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-02", title: "Stort trädäck", caption: "Direkt söderläge för långa sommarkvällar", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-03", title: "Rymliga lokaler", caption: "Skönt inomhus när vinden friskar i", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-04", title: "Social miljö", caption: "En plats där man gärna stannar kvar", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-05", title: "Kväll vid vattnet", caption: "Middag, dryck och häng vid hamnen", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-06", title: "Ljus kvällshimmel", caption: "Mjuk kvällston över hela kajen", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-07", title: "Plats för sällskap", caption: "Enkelt att samla både små och stora bord", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-08", title: "Avkopplad känsla", caption: "Lugn miljö med havet nära", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-09", title: "Sommar vid hamnen", caption: "Kvällar som gärna blir långa", image: "/images/hero-atmosphere.svg" },
  { id: "heritage-10", title: "Kajliv året runt", caption: "Samma varma känsla även när vädret skiftar", image: "/images/hero-atmosphere.svg" },
];

export const MENU_GALLERY_TILES: GalleryTile[] = [
  { id: "menu-01", title: "Trädäcket i söderläge", caption: "Perfekt för sena kvällar i solen vid vattnet", image: "/images/hero-atmosphere.svg" },
  { id: "menu-02", title: "Rymligt inomhus", caption: "Avslappnad miljö för både middag och spontanhäng", image: "/images/hero-atmosphere.svg" },
  { id: "menu-03", title: "Social stämning", caption: "Mat, drinkar och umgänge under samma tak", image: "/images/hero-atmosphere.svg" },
  { id: "menu-04", title: "Lokala smaker", caption: "Bra råvaror, rejält med smak och avslappnad servering", image: "/images/hero-atmosphere.svg" },
  { id: "menu-05", title: "Kväll med vänner", caption: "Plats för både spontana besök och större sällskap", image: "/images/hero-atmosphere.svg" },
  { id: "menu-06", title: "Fisk och favoriter", caption: "Säsongens råvaror i en enkel, varm servering", image: "/images/hero-atmosphere.svg" },
  { id: "menu-07", title: "Mätt och nöjd", caption: "Rätter man längtar tillbaka till", image: "/images/hero-atmosphere.svg" },
  { id: "menu-08", title: "Lokal karaktär", caption: "Smaker som passar både lunch och kväll", image: "/images/hero-atmosphere.svg" },
  { id: "menu-09", title: "Kvällsservering", caption: "Avslappnad service i lugnt tempo", image: "/images/hero-atmosphere.svg" },
  { id: "menu-10", title: "Något för alla", caption: "Från lättare rätter till rejäla favoriter", image: "/images/hero-atmosphere.svg" },
];

export const VIBE_GALLERY_TILES: GalleryTile[] = [
  { id: "vibe-01", title: "Biljard och dart", caption: "En naturlig start på kvällen efter maten", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-02", title: "Långt kvällshäng", caption: "Stanna kvar i lugn miljö med plats för alla", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-03", title: "Livemusik ibland", caption: "Sommaren får extra puls med musik på plats", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-04", title: "Rum för gemenskap", caption: "Ytor som funkar för både små och stora grupper", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-05", title: "Middag till häng", caption: "Kvällen fortsätter naturligt efter sista tuggan", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-06", title: "Spelkvällar", caption: "Utmana vännerna i en snabb match", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-07", title: "Bra stämning", caption: "Avspänt, socialt och enkelt att trivas", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-08", title: "Flexibla ytor", caption: "Enkelt att växla mellan middag och aktivitet", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-09", title: "Hamnen nära", caption: "Kvällsluften och utsikten finns alltid runt hörnet", image: "/images/hero-atmosphere.svg" },
  { id: "vibe-10", title: "Sena kvällar", caption: "En plats där kvällen gärna får ta tid", image: "/images/hero-atmosphere.svg" },
];
