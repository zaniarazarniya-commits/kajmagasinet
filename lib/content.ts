/**
 * Allt sidinnehåll som SV/EN-par. Ingen text bor i markup — samma modell som
 * menydatan, så ett nytt språk är en ny nyckel och inte en ny DOM-genomgång.
 */

import type { Loc } from "@/lib/i18n";

export const NAV = {
  menu: { sv: "Meny", en: "Menu" },
  bar: { sv: "Baren", en: "The bar" },
  about: { sv: "Om oss", en: "About" },
  findUs: { sv: "Hitta hit", en: "Find us" },
  book: { sv: "Boka bord", en: "Book a table" },
  backHome: { sv: "Till startsidan", en: "Back to home" },
  openMenu: { sv: "Öppna meny", en: "Open menu" },
  closeMenu: { sv: "Stäng meny", en: "Close menu" },
} satisfies Record<string, Loc>;

export const HERO = {
  kicker: { sv: "Lysekil · Sedan 2010", en: "Lysekil · Since 2010" },
  title: "Kajmagasinet",
  tagline: {
    sv: "Restaurang och bar direkt vid vattnet i Lysekil — mat, drinkar och sena sommarkvällar på trädäcket.",
    en: "Restaurant and bar right by the water in Lysekil — food, drinks and long summer evenings on the deck.",
  },
  seeMenu: { sv: "Se menyn", en: "See the menu" },
  openNow: { sv: "Öppet nu", en: "Open now" },
  closedNow: { sv: "Stängt just nu", en: "Closed right now" },
  closes: { sv: "stänger", en: "closes" },
  opens: { sv: "öppnar", en: "opens" },
  today: { sv: "Idag", en: "Today" },
};

export const ABOUT = {
  kicker: { sv: "Om oss", en: "About us" },
  heading: {
    sv: "En samlingspunkt vid kajen",
    en: "A gathering place on the quay",
  },
  subheading: {
    sv: "Bohuslänsk gästfrihet sedan 2010",
    en: "Bohuslän hospitality since 2010",
  },
  body: [
    {
      sv: "Kajmagasinet är en naturlig samlingspunkt direkt vid vattnet i Lysekil. Här kan du njuta av sena sommarkvällar på trädäcket eller slå dig ner i våra rymliga lokaler inomhus.",
      en: "Kajmagasinet is a natural gathering place right by the water in Lysekil. Enjoy long summer evenings on the wooden deck, or settle into our spacious rooms indoors.",
    },
    {
      sv: "Vi serverar vällagad mat utan krångel — bra råvaror, lokala favoriter och rätter man faktiskt blir mätt på. Kvällen slutar inte när tallrikarna dukas av: baren är hjärtat i huset.",
      en: "We serve well-made food without fuss — good produce, local favourites and dishes that actually fill you up. The evening doesn't end when the plates are cleared: the bar is the heart of the house.",
    },
  ],
  captionTitle: { sv: "Bakom baren", en: "Behind the bar" },
  captionBody: {
    sv: "Vi mixar varje drink på plats — säg vad du gillar.",
    en: "We mix every drink to order — tell us what you like.",
  },
};

export const MENU_PREVIEW = {
  kicker: { sv: "Servering", en: "Kitchen" },
  heading: { sv: "Menyn", en: "The menu" },
  lead: {
    sv: "Ett urval från köket. Bohuslänska råvaror, vällagat och utan krångel.",
    en: "A selection from the kitchen. Bohuslän produce, cooked well and without fuss.",
  },
  subheading: { sv: "Ett urval ur menyn", en: "A selection from the menu" },
  note: {
    sv: "Hela menyn med förrätter, barnmeny, desserter, öl, vin och sprit finns på menysidan.",
    en: "The full menu — starters, kids' menu, desserts, beer, wine and spirits — is on the menu page.",
  },
  fullMenu: { sv: "Hela menyn & vinlistan", en: "Full menu & wine list" },
  tagSea: { sv: "Skaldjur", en: "Seafood" },
  tagLocal: { sv: "Lokal gård", en: "Local farm" },
};

export type PreviewDish = {
  name: string;
  price: string;
  tag?: "sea" | "local";
  description: Loc;
};

/** Sex utvalda rätter — ett urval, inte hela menyn. */
export const PREVIEW_DISHES: PreviewDish[] = [
  {
    name: "Bohuslänsk Fisksoppa",
    price: "269:-",
    tag: "sea",
    description: {
      sv: "Lax, torsk, räkor, saffran, bröd & aioli. Bohuslänska färskvaror.",
      en: "Salmon, cod, prawns, saffron, bread & aioli. Fresh Bohuslän produce.",
    },
  },
  {
    name: "Moules Frites",
    price: "289:-",
    tag: "sea",
    description: {
      sv: "Bohuslänska musslor i husets musselsoppa med örter, citron & crispers.",
      en: "Bohuslän mussels in the house mussel broth with herbs, lemon & crispers.",
    },
  },
  {
    name: "Klassisk Toast Skagen",
    price: "169:-",
    tag: "sea",
    description: {
      sv: "Smörstekt bröd, husets skagenröra, citron, rödlök, stenbitsrom & lime.",
      en: "Butter-fried bread, the house skagen mix, lemon, red onion, lumpfish roe & lime.",
    },
  },
  {
    name: "Räksmörgås",
    price: "269:-",
    tag: "sea",
    description: {
      sv: "Surdegsbröd, räkor, ägg, dill, majonnäs, gurka, tomat & stenbitsrom.",
      en: "Sourdough, prawns, egg, dill, mayonnaise, cucumber, tomato & lumpfish roe.",
    },
  },
  {
    name: "Entrecote 200g",
    price: "369:-",
    tag: "local",
    description: {
      sv: "Ugnsbakad potatis, sallad, grillade grönsaker, bearnaise- & pepparsås.",
      en: "Oven-baked potato, salad, grilled vegetables, béarnaise & pepper sauce.",
    },
  },
  {
    name: "Grillade Tigerräkor",
    price: "239:-",
    tag: "sea",
    description: {
      sv: "Lök, vitlök, paprika, peperoncino, persilja & olivolja på salladsbädd.",
      en: "Onion, garlic, pepper, peperoncino, parsley & olive oil on a bed of salad.",
    },
  },
];

export const BAR = {
  kicker: { sv: "Baren", en: "The bar" },
  heading: { sv: "Något kallt i glaset?", en: "Something cold in the glass?" },
  lead: {
    sv: "Husets egna signaturdrinkar, egenimporterat vin och kalla fatöl. Baren är hjärtat i huset.",
    en: "The house's own signature drinks, self-imported wine and cold draught beer. The bar is the heart of the house.",
  },
  previous: { sv: "Föregående drinkar", en: "Previous drinks" },
  next: { sv: "Nästa drinkar", en: "Next drinks" },
  page: { sv: "Sida", en: "Page" },
  wineKicker: { sv: "Endast hos oss", en: "Only here" },
  wineHeading: {
    sv: "Egen import från Fratelli Vogadori",
    en: "Our own import from Fratelli Vogadori",
  },
  wineBody: {
    sv: "För vinälskaren har vi något helt unikt: vi importerar våra egna viner direkt från italienska Fratelli Vogadori — ett urval du inte hittar någon annanstans i Sverige.",
    en: "For the wine lover we have something genuinely rare: we import our own wines directly from Fratelli Vogadori in Italy — a selection you will not find anywhere else in Sweden.",
  },
  wineCta: { sv: "Se vinlistan", en: "See the wine list" },
};

export const HOUSE = {
  kicker: { sv: "Huset", en: "The house" },
  heading: { sv: "Från middag till häng", en: "From dinner to hanging out" },
  body: {
    sv: "Kvällen slutar inte när tallrikarna dukas av. Utmana kompisgänget i en match biljard eller dart, lyssna på livemusik under sommaren — eller bara njut av stämningen.",
    en: "The evening doesn't end when the plates are cleared. Challenge your friends to a game of pool or darts, catch live music in summer — or just enjoy the atmosphere.",
  },
  tags: [
    { icon: "ball", label: { sv: "Biljard", en: "Pool" } },
    { icon: "target", label: { sv: "Dart", en: "Darts" } },
    { icon: "music", label: { sv: "Livemusik", en: "Live music" } },
    { icon: "people", label: { sv: "Stora sällskap", en: "Large parties" } },
    { icon: "spark", label: { sv: "Fest & firande", en: "Celebrations" } },
  ],
} as const;

export const CONTACT = {
  kicker: { sv: "Besök oss", en: "Visit us" },
  heading: { sv: "Boka bord & hitta hit", en: "Book a table & find us" },
  lead: {
    sv: "Fyll i formuläret så bekräftar vi ditt bord via telefon eller mejl. Är du i sista minuten eller bokar till ikväll? Ring oss — det går alltid snabbast.",
    en: "Fill in the form and we'll confirm your table by phone or email. In a hurry, or booking for tonight? Call us — that's always fastest.",
  },
  formTitle: { sv: "Bokningsförfrågan", en: "Request a table" },
  formNote: {
    sv: "Vi svarar så snart vi kan under öppettiderna.",
    en: "We reply as soon as we can during opening hours.",
  },
  date: { sv: "Datum", en: "Date" },
  time: { sv: "Tid", en: "Time" },
  guests: { sv: "Antal gäster", en: "Number of guests" },
  fewerGuests: { sv: "Färre gäster", en: "Fewer guests" },
  moreGuests: { sv: "Fler gäster", en: "More guests" },
  name: { sv: "Namn", en: "Name" },
  phone: { sv: "Telefon", en: "Phone" },
  email: { sv: "E-post", en: "Email" },
  requests: { sv: "Allergier eller önskemål", en: "Allergies or requests" },
  requestsPlaceholder: {
    sv: "t.ex. skaldjursallergi, barnstol, bord på trädäcket",
    en: "e.g. shellfish allergy, high chair, table on the deck",
  },
  submit: { sv: "Skicka förfrågan", en: "Send request" },
  /** Ärlighet om mekaniken: formuläret skickar inget själv. */
  formFoot: {
    sv: "Formuläret öppnar din e-post med allt ifyllt. Bordet är bokat först när vi bekräftat.",
    en: "The form opens your email app with everything filled in. Your table is booked once we have confirmed it.",
  },
  callToday: {
    sv: "Bokar du till idag? Ring istället:",
    en: "Booking for today? Call instead:",
  },
  address: { sv: "Adress", en: "Address" },
  openingHours: { sv: "Öppettider", en: "Opening hours" },
  mapTitle: { sv: "Karta till Kajmagasinet", en: "Map to Kajmagasinet" },
  directions: { sv: "Vägbeskrivning", en: "Get directions" },
  directionsAria: {
    sv: "Vägbeskrivning till Kajmagasinet — öppnas i ny flik",
    en: "Directions to Kajmagasinet — opens in a new tab",
  },
};

/** Mejlet som bokningsformuläret förbereder åt gästen. */
export const BOOKING_MAIL = {
  subject: { sv: "Bordsbokning", en: "Table booking" },
  guestsSuffix: { sv: "pers", en: "guests" },
  greeting: { sv: "Hej Kajmagasinet!", en: "Hello Kajmagasinet!" },
  intent: { sv: "Jag vill boka ett bord.", en: "I would like to book a table." },
  labels: {
    date: { sv: "Datum", en: "Date" },
    time: { sv: "Tid", en: "Time" },
    guests: { sv: "Antal gäster", en: "Number of guests" },
    name: { sv: "Namn", en: "Name" },
    phone: { sv: "Telefon", en: "Phone" },
    email: { sv: "E-post", en: "Email" },
    requests: { sv: "Önskemål", en: "Requests" },
  },
  thanks: { sv: "Tack!", en: "Thank you!" },
};

export const FOOTER = {
  blurb: {
    sv: "Restaurang och bar vid Rosviksgatan i Lysekil sedan 2010. Mat, drinkar och stämning direkt vid vattnet.",
    en: "Restaurant and bar on Rosviksgatan in Lysekil since 2010. Food, drinks and atmosphere right by the water.",
  },
  navigate: { sv: "Navigering", en: "Navigate" },
  menuAndWine: { sv: "Meny & vinlista", en: "Menu & wine list" },
  findUs: { sv: "Hitta hit", en: "Find us" },
  copyright: { sv: "© 2026 Kajmagasinet", en: "© 2026 Kajmagasinet" },
  place: { sv: "Lysekil, Bohuslän, Sverige", en: "Lysekil, Bohuslän, Sweden" },
};

export const MENU_PAGE = {
  kicker: { sv: "Kajmagasinet · Lysekil", en: "Kajmagasinet · Lysekil" },
  title: { sv: "Meny & Dryck", en: "Menu & Drinks" },
  subtitle: {
    sv: "Bohuslänska råvaror, egenimporterade viner och husets drinkar.",
    en: "Bohuslän produce, self-imported wines and the house drinks.",
  },
  footNote: {
    sv: "Priser i SEK. Med reservation för ändringar.",
    en: "Prices in SEK. Subject to change.",
  },
  glass: { sv: "Glas", en: "Glass" },
  bottle: { sv: "Flaska", en: "Bottle" },
  allergyTitle: { sv: "Är du allergisk?", en: "Any allergies?" },
  /** Sista satsen är juridiskt medveten och ska stå kvar. */
  allergyBody: {
    sv: "Fråga personalen — vi går gärna igenom innehållet i varje rätt med dig. Märkningen i menyn är en vägledning, inte en garanti.",
    en: "Please ask our staff — we are happy to go through the ingredients of any dish with you. The labels in the menu are guidance, not a guarantee.",
  },
  call: { sv: "Ring 076-716 04 24", en: "Call +46 76-716 04 24" },
  groupNav: { sv: "Menygrupper", en: "Menu groups" },
  sectionNav: { sv: "Avsnitt", en: "Sections" },
};
