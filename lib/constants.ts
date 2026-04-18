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

/**
 * Drinkar som visas i karusellen på startsidan.
 * Lägg till nya genom att:
 *   1. Släng en bild i /public/images/drinks/<slug>.jpg (eller .png/.webp)
 *   2. Lägg till ett objekt här nedan med samma filnamn
 */
export const DRINKS = [
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
] as const;

/** Avsnittet "Från middag till häng" — socialt häng efter maten */
export const AFTER_MEAL = {
  subtitle:
    "Kvällen slutar inte när tallrikarna dukas av. Kajmagasinet är byggt för umgänge.",
  body:
    "Utmana kompisgänget i en match biljard eller dart, lyssna på livemusik under sommaren eller bara njut av stämningen. Vi har gott om plats för både stora sällskap och spontana besök. Det är helt enkelt ett ställe där det är roligt att vara.",
} as const;
