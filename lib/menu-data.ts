/**
 * Menydata — hela matmenyn, vinlistan, öl, drinkar och sprit.
 *
 * Innehållet är data, inte markup: menysidan renderar det som är här och inget
 * annat. Transkriberat från restaurangens PDF-meny 2025.
 *
 * Kända luckor att bekräfta med restaurangen innan lansering:
 * - Sprit-sektionerna saknar priser helt i källmaterialet.
 * - Kajens Speciella Drinkar saknar priser (utom den alkoholfria, 69:-).
 * - Barnmenyns Köttfärspasta hade överstruken beskrivning; texten är ett antagande.
 */

import type { IconName } from "@/components/ui/Icon";
import type { Loc } from "@/lib/i18n";

/** Kostmärkning: v veg · ve vegan · gf glutenfri · s skaldjur · f fisk. */
export type DietCode = "v" | "ve" | "gf" | "s" | "f";

export const DIET_CODES: Record<DietCode, string> = {
  v: "V",
  ve: "VE",
  gf: "GF",
  s: "S",
  f: "F",
};

/** Korta bokstavskoder just för att fungera oavsett läsarens språk. */
export const DIET_LEGEND: { code: DietCode; label: Loc }[] = [
  { code: "v", label: { sv: "Vegetariskt", en: "Vegetarian" } },
  { code: "ve", label: { sv: "Veganskt", en: "Vegan" } },
  { code: "gf", label: { sv: "Glutenfri", en: "Gluten free" } },
  { code: "s", label: { sv: "Skaldjur", en: "Shellfish" } },
  { code: "f", label: { sv: "Fisk", en: "Fish" } },
];

export type MenuItem = {
  name: string;
  /** Ursprungsland, portionsstorlek eller smakprofil. */
  meta?: Loc;
  price?: string;
  glassPrice?: string;
  bottlePrice?: string;
  diet?: DietCode[];
  /** Guldbadge, t.ex. egen import. */
  mark?: Loc;
  description?: Loc;
};

/**
 * `dish` full rad med beskrivning · `tight` kompakt dryckesrad ·
 * `plain` spritlista i två kolumner.
 */
export type MenuRowType = "dish" | "tight" | "plain";

export type MenuSection = {
  id: string;
  icon: IconName;
  title: Loc;
  type: MenuRowType;
  note?: Loc;
  items: MenuItem[];
};

export type MenuGroup = {
  id: string;
  icon: IconName;
  title: Loc;
  image: string;
  imageAlt: Loc;
  note?: Loc;
  sections: MenuSection[];
};

export const MENU: MenuGroup[] = [
  {
    id: "mat",
    icon: "plate",
    title: { sv: "Mat", en: "Food" },
    image: "/images/gallery/servering/image%20(7).jpg",
    imageAlt: {
      sv: "Bohuslänsk fisksoppa med havskräfta",
      en: "Bohuslän fish soup with langoustine",
    },
    sections: [
      {
        id: "forratter",
        icon: "starter",
        title: { sv: "Förrätter", en: "Starters" },
        type: "dish",
        items: [
          {
            name: "Klassisk Toast Skagen",
            price: "169:-",
            diet: ["s"],
            description: {
              sv: "Smörstekt bröd med husets skagenröra, citron, rödlök, stenbitsrom & lime.",
              en: "Butter-fried bread with the house skagen mix, lemon, red onion, lumpfish roe & lime.",
            },
          },
          {
            name: "Grekiska Smördegsknyten",
            price: "99:-",
            diet: ["v"],
            description: {
              sv: "Vitost fylld smördeg & tzatziki.",
              en: "Puff pastry filled with white cheese & tzatziki.",
            },
          },
          {
            name: "Vitlöksbröd",
            price: "89:-",
            diet: ["v"],
            description: {
              sv: "Husets vitlöksblandning på surdegsbröd, persilja & aioli.",
              en: "The house garlic blend on sourdough, parsley & aioli.",
            },
          },
          {
            name: "Marinerade Oliver",
            price: "69:-",
            diet: ["ve", "gf"],
            description: {
              sv: "Husets marinerade kalamata & gröna oliver.",
              en: "House-marinated kalamata & green olives.",
            },
          },
          {
            name: "Liten Bohuslänsk Fisksoppa",
            meta: { sv: "Färska bohuslänska råvaror", en: "Fresh Bohuslän produce" },
            price: "179:-",
            diet: ["s", "f"],
            description: {
              sv: "Serveras med lax, torsk, räkor, bröd & aioli.",
              en: "Served with salmon, cod, prawns, bread & aioli.",
            },
          },
          {
            name: "Grekisk Sallad",
            price: "89:-",
            diet: ["v", "gf"],
            description: {
              sv: "Sallad, fetaost, tomat, gurka, kalamataoliver, persilja & olivolja.",
              en: "Salad, feta, tomato, cucumber, kalamata olives, parsley & olive oil.",
            },
          },
          {
            name: "Nachotallrik",
            price: "179:-",
            description: {
              sv: "Husets köttfärsröra, rödlök, jalapeño, cream fraiche, salsa & nachosost.",
              en: "House minced beef, red onion, jalapeño, crème fraîche, salsa & nacho cheese.",
            },
          },
        ],
      },
      {
        id: "huvudratter",
        icon: "main",
        title: { sv: "Huvudrätter", en: "Main courses" },
        type: "dish",
        items: [
          {
            name: "Bohuslänsk Fisksoppa",
            meta: { sv: "Bohuslänska färskvaror", en: "Fresh Bohuslän produce" },
            price: "269:-",
            diet: ["s", "f"],
            description: {
              sv: "Lax, torsk, räkor, saffran, bröd & aioli.",
              en: "Salmon, cod, prawns, saffron, bread & aioli.",
            },
          },
          {
            name: "Moules Frites",
            meta: { sv: "Bohuslänska färskvaror", en: "Fresh Bohuslän produce" },
            price: "289:-",
            diet: ["s"],
            description: {
              sv: "Bohuslänska musslor i husets musselsoppa med örter, citron & crispers.",
              en: "Bohuslän mussels in the house mussel broth with herbs, lemon & crispers.",
            },
          },
          {
            name: "Fish & Chips",
            price: "199:-",
            diet: ["f"],
            description: {
              sv: "Crispers, remouladsås, citron & sallad.",
              en: "Crispers, remoulade, lemon & salad.",
            },
          },
          {
            name: "Räksmörgås",
            price: "269:-",
            diet: ["s"],
            description: {
              sv: "Surdegsbröd, sallad, dill, majonnäs, räkor, ägg, citron, gurka, tomat & stenbitsrom.",
              en: "Sourdough, salad, dill, mayonnaise, prawns, egg, lemon, cucumber, tomato & lumpfish roe.",
            },
          },
          {
            name: "Grillad Laxfilé",
            price: "279:-",
            diet: ["f"],
            description: {
              sv: "Ugnsbakad potatis samt grillade grönsaker, remouladsås & citron.",
              en: "Oven-baked potato with grilled vegetables, remoulade & lemon.",
            },
          },
          {
            name: "Grillade Tigerräkor",
            meta: { sv: "10 st", en: "10 pcs" },
            price: "239:-",
            diet: ["s"],
            description: {
              sv: "Grillade med lök, vitlök, paprika, peperoncino, persilja & olivolja. Serveras på salladsbädd med bröd.",
              en: "Grilled with onion, garlic, pepper, peperoncino, parsley & olive oil. Served on a bed of salad with bread.",
            },
          },
          {
            name: "Husets Fläskschnitzel",
            price: "239:-",
            description: {
              sv: "Crispers, bearnaisesås, sallad, citron & kapris.",
              en: "Crispers, béarnaise, salad, lemon & capers.",
            },
          },
          {
            name: "Entrecote 200g",
            meta: { sv: "Kött från lokal gård", en: "Beef from a local farm" },
            price: "369:-",
            description: {
              sv: "Ugnsbakad potatis, sallad, grillade grönsaker, bearnaisesås & pepparsås.",
              en: "Oven-baked potato, salad, grilled vegetables, béarnaise & pepper sauce.",
            },
          },
          {
            name: "Kycklingspett",
            price: "239:-",
            description: {
              sv: "Crispers, grillad paprika & tomat samt tzatziki.",
              en: "Crispers, grilled pepper & tomato with tzatziki.",
            },
          },
          {
            name: "Kajens Köttfärspasta",
            price: "239:-",
            description: {
              sv: "Krämig köttfärsröra med linguini & cream fraiche.",
              en: "Creamy minced beef with linguine & crème fraîche.",
            },
          },
          {
            name: "Kajens Ost & Baconburgare",
            meta: { sv: "Högrev från lokal gård", en: "Chuck from a local farm" },
            price: "235:-",
            description: {
              sv: "Crispers, sallad, husets dressing, rödlök, ost, bacon, ketchup & aioli dipp.",
              en: "Crispers, salad, house dressing, red onion, cheese, bacon, ketchup & aioli dip.",
            },
          },
          {
            name: "Halloumiburgare",
            price: "219:-",
            diet: ["v"],
            description: {
              sv: "Crispers, sallad, avokadomajonnäs, tomat, rödlök, ketchup & aioli dipp.",
              en: "Crispers, salad, avocado mayonnaise, tomato, red onion, ketchup & aioli dip.",
            },
          },
          {
            name: "Vegan Beyondburgare",
            price: "219:-",
            diet: ["ve"],
            description: {
              sv: "Crispers, sallad, vegansk avokadomajonnäs, tomat, rödlök & ketchup dipp.",
              en: "Crispers, salad, vegan avocado mayonnaise, tomato, red onion & ketchup dip.",
            },
          },
        ],
      },
      {
        id: "barn",
        icon: "kid",
        title: { sv: "Barnmeny", en: "Kids' menu" },
        type: "dish",
        note: { sv: "Upp till 12 år.", en: "Up to 12 years." },
        items: [
          {
            name: "Köttfärspasta",
            price: "139:-",
            description: {
              sv: "Husets köttfärsröra med linguini.",
              en: "House minced beef with linguine.",
            },
          },
          {
            name: "Barnburgare",
            meta: { sv: "100 g högrev", en: "100 g chuck" },
            price: "139:-",
            description: { sv: "Crispers & ketchup dipp.", en: "Crispers & ketchup dip." },
          },
          {
            name: "Fish & Chips",
            price: "129:-",
            diet: ["f"],
            description: {
              sv: "Crispers, citron & remouladsås.",
              en: "Crispers, lemon & remoulade.",
            },
          },
          {
            name: "Kyckling Nuggets",
            price: "139:-",
            description: { sv: "Crispers & ketchup.", en: "Crispers & ketchup." },
          },
        ],
      },
      {
        id: "dessert",
        icon: "cake",
        title: { sv: "Desserter", en: "Desserts" },
        type: "dish",
        items: [
          {
            name: "Pannacotta",
            price: "99:-",
            diet: ["v"],
            description: {
              sv: "Husets pannacotta med hallonglasyr.",
              en: "House pannacotta with raspberry glaze.",
            },
          },
          {
            name: "Kladdkaka",
            price: "99:-",
            diet: ["v"],
            description: {
              sv: "Jordgubbsglass & italiensk chokladsås.",
              en: "Strawberry ice cream & Italian chocolate sauce.",
            },
          },
          {
            name: "Oreo Mono Bakelse",
            price: "99:-",
            diet: ["v"],
            description: {
              sv: "Fyllig bakelse med oreosmak, serveras med grädde & chokladsås.",
              en: "Rich oreo-flavoured pastry served with cream & chocolate sauce.",
            },
          },
          {
            name: "Glassdröm",
            price: "99:-",
            diet: ["v"],
            description: {
              sv: "Vaniljglass, jordgubbsglass & italiensk chokladsås.",
              en: "Vanilla ice cream, strawberry ice cream & Italian chocolate sauce.",
            },
          },
        ],
      },
    ],
  },

  {
    id: "dryck",
    icon: "glass",
    title: { sv: "Drinkar & Öl", en: "Drinks & Beer" },
    image: "/images/drinks/mc-blabar.jpeg",
    imageAlt: {
      sv: "Husets blåbärsdrink MC",
      en: "The house blueberry drink MC",
    },
    sections: [
      {
        id: "drinkar",
        icon: "glass",
        title: { sv: "Kajens Speciella Drinkar", en: "Kaj's Signature Drinks" },
        type: "dish",
        note: {
          sv: "Husets egna signaturdrinkar. Säg vad du gillar — baren mixar gärna efter smak.",
          en: "The house signature drinks. Tell us what you like — the bar will happily mix to taste.",
        },
        items: [
          {
            name: "Verana Raspberry",
            meta: { sv: "Söt", en: "Sweet" },
            description: {
              sv: "Uppfriskande söt hallondrink. Hallonliqueur & hallonrom.",
              en: "Refreshingly sweet raspberry drink. Raspberry liqueur & raspberry rum.",
            },
          },
          {
            name: "P-P",
            meta: { sv: "Sursöt", en: "Sour & sweet" },
            description: {
              sv: "Fräsch passionsdrink. Vodka, passionsliqueur & passionssyrup.",
              en: "Fresh passionfruit drink. Vodka, passionfruit liqueur & passionfruit syrup.",
            },
          },
          {
            name: "MC",
            meta: { sv: "Sötsur", en: "Sweet & sour" },
            description: {
              sv: "Fräsch blåbärsdrink. Blåbärsvodka, blåbärsliqueur & Red Bull Blåbär.",
              en: "Fresh blueberry drink. Blueberry vodka, blueberry liqueur & Red Bull Blue.",
            },
          },
          {
            name: "WeeWee",
            meta: { sv: "Vattenmelon", en: "Watermelon" },
            description: {
              sv: "Uppfriskande fräsch vattenmelondrink. Vodka vattenmelon & vattenmelonliqueur.",
              en: "Refreshing watermelon drink. Watermelon vodka & watermelon liqueur.",
            },
          },
          {
            name: "Dr Love",
            meta: { sv: "Söt", en: "Sweet" },
            description: {
              sv: "Söt drink med persikosmak. Ljus rom & Peachtree.",
              en: "Sweet peach-flavoured drink. Light rum & Peachtree.",
            },
          },
        ],
      },
      {
        id: "alkfritt",
        icon: "water",
        title: { sv: "Alkoholfritt", en: "Alcohol free" },
        type: "tight",
        items: [
          { name: "Pepsi / Pepsi Max / Zingo / 7up", price: "35:-" },
          {
            name: "Ramlösa",
            meta: { sv: "Naturell / Citrus", en: "Still / Citrus" },
            price: "35:-",
          },
          {
            name: "Festis tetra",
            meta: { sv: "Jordgubb / Päron", en: "Strawberry / Pear" },
            price: "25:-",
          },
          {
            name: "Carlsberg",
            meta: { sv: "Alkoholfri", en: "Alcohol free" },
            price: "49:-",
          },
          { name: "Brooklyn Special Effects", price: "55:-" },
          {
            name: "Somersby Päron",
            meta: { sv: "Alkoholfri", en: "Alcohol free" },
            price: "49:-",
          },
          { name: "Red Bull", price: "39:-" },
          {
            name: "Alkoholfri drink",
            meta: { sv: "Mixad i baren", en: "Mixed at the bar" },
            price: "69:-",
          },
        ],
      },
      {
        id: "cider",
        icon: "apple",
        title: { sv: "Cider", en: "Cider" },
        type: "tight",
        items: [
          { name: "Somersby Päron", price: "79:-" },
          { name: "Somersby Spritz Lemon", price: "79:-" },
          { name: "Xide Raspberry Blossom", price: "89:-" },
          { name: "Garage Hard Lemon", price: "89:-" },
        ],
      },
      {
        id: "mjod",
        icon: "honey",
        title: { sv: "Mjöd", en: "Mead" },
        type: "tight",
        note: {
          sv: "11% · Svenskt, Vara Bryggeri. Mjöd är en uråldrig, honungsbaserad dryck som kan vara både torr och söt — den tillverkas runt om i världen och har på senare år upplevt en renässans.",
          en: "11% · Swedish, Vara Brewery. Mead is an ancient honey-based drink that can be either dry or sweet — it is made all over the world and has enjoyed a real revival in recent years.",
        },
        items: [
          {
            name: "Hawaii Kassler",
            meta: { sv: "Ananasmjöd", en: "Pineapple mead" },
            price: "159:-",
          },
          {
            name: "Judas",
            meta: { sv: "Flädermjöd", en: "Elderflower mead" },
            price: "159:-",
          },
        ],
      },
      {
        id: "fatol",
        icon: "beer",
        title: { sv: "Fatöl 40 cl", en: "Draught beer 40 cl" },
        type: "tight",
        items: [
          { name: "Pripps Blå", price: "85:-" },
          { name: "Staropramen", price: "95:-" },
          { name: "Eriksbergs Karaktär", price: "95:-" },
          { name: "Carlsberg Hof Organic", price: "85:-" },
          { name: "Brooklyn Stonewall Inn IPA", price: "95:-" },
          { name: "Birra Poretti Originale", price: "95:-" },
          { name: "Kronenbourg 1664 Blanc", price: "89:-" },
        ],
      },
      {
        id: "flaskol",
        icon: "bottle",
        title: { sv: "Flasköl", en: "Bottled beer" },
        type: "tight",
        items: [
          {
            name: "Grimbergen Blonde",
            meta: { sv: "Belgien", en: "Belgium" },
            price: "89:-",
          },
          {
            name: "Birra Poretti Originale",
            meta: { sv: "Italien", en: "Italy" },
            price: "89:-",
          },
          {
            name: "Peroni",
            meta: { sv: "Italien", en: "Italy" },
            price: "119:-",
            diet: ["gf"],
          },
          { name: "100W IPA", meta: { sv: "Sverige", en: "Sweden" }, price: "89:-" },
          { name: "Guinness", meta: { sv: "Irland", en: "Ireland" }, price: "95:-" },
          {
            name: "Corona Extra",
            meta: { sv: "Mexiko", en: "Mexico" },
            price: "89:-",
          },
          {
            name: "Eriksberg 50 cl",
            meta: { sv: "Sverige", en: "Sweden" },
            price: "99:-",
          },
          {
            name: "Tuborg Guld 50 cl",
            meta: { sv: "Sverige", en: "Sweden" },
            price: "99:-",
          },
          {
            name: "Mythos 50 cl",
            meta: { sv: "Grekland", en: "Greece" },
            price: "99:-",
          },
          {
            name: "Erdinger Weissbier Hefe 50 cl",
            meta: { sv: "Tyskland", en: "Germany" },
            price: "99:-",
          },
        ],
      },
    ],
  },

  {
    id: "vin",
    icon: "bottle",
    title: { sv: "Vin", en: "Wine" },
    image: "/images/gallery/servering/image%20(8).jpg",
    imageAlt: {
      sv: "Vitt vin i glas med flaska",
      en: "White wine in a glass with the bottle",
    },
    sections: [
      {
        id: "mousserande",
        icon: "sparkle",
        title: { sv: "Mousserande", en: "Sparkling" },
        type: "dish",
        items: [
          {
            name: "La Primizie Prosecco",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "119:-",
            bottlePrice: "479:-",
          },
          {
            name: "MVSA Cava Brut",
            meta: { sv: "Spanien", en: "Spain" },
            glassPrice: "109:-",
            bottlePrice: "449:-",
          },
          {
            name: "Fratelli Vogadori Brut",
            meta: { sv: "Italien", en: "Italy" },
            bottlePrice: "549:-",
            mark: { sv: "Egen import", en: "Our own import" },
          },
          {
            name: "Mumm Cordon Rouge Champagne",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "1299:-",
            description: {
              sv: "Pinot Noir, Chardonnay, Pinot Meunier. Intensiv och komplex smak med toner av färska frukter och kola. Lång, kvardröjande avslutning.",
              en: "Pinot Noir, Chardonnay, Pinot Meunier. Intense, complex palate with notes of fresh fruit and caramel. Long, lingering finish.",
            },
          },
          {
            name: "Perrier-Jouët Blanc de Blancs Champagne",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "2299:-",
            description: {
              sv: "Aromer av fläder, akacia, kaprifol och syrlig citrus. Långvarig friskhet med ett överraskande slätt och mjukt avslut.",
              en: "Aromas of elderflower, acacia, honeysuckle and tart citrus. Lasting freshness with a surprisingly smooth, soft finish.",
            },
          },
        ],
      },
      {
        id: "vitt",
        icon: "glass",
        title: { sv: "Vita Viner", en: "White Wines" },
        type: "dish",
        items: [
          {
            name: "Garganega Veneto",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "119:-",
            bottlePrice: "449:-",
            mark: { sv: "Egen import", en: "Our own import" },
            description: {
              sv: "Torrt vitt vin på Garganega. Fint, intensivt och mjukt — fräscht och lätt smakrikt med en ton av mandel i avslutningen. Doftande, blommig och fruktig arom.",
              en: "Dry white on Garganega. Fine, intense and soft — fresh and lightly flavourful with a note of almond on the finish. Fragrant, floral and fruity aroma.",
            },
          },
          {
            name: "Les Deux Pins Sauvignon Blanc",
            meta: { sv: "Frankrike", en: "France" },
            glassPrice: "129:-",
            bottlePrice: "499:-",
            description: {
              sv: "Fräscht, uttrycksfullt och välbalanserat med blommiga toner och inslag av exotiska frukter samt citronskal.",
              en: "Fresh, expressive and well balanced with floral notes, exotic fruit and lemon zest.",
            },
          },
          {
            name: "Laugel Cuvée Riesling",
            meta: { sv: "Frankrike", en: "France" },
            glassPrice: "139:-",
            bottlePrice: "549:-",
            description: {
              sv: "Torr och elegant Riesling från Alsace med tydlig frukt och mineralitet. Friska citrusaromer och en ren, balanserad smak med fin syra. Mycket matvänligt — passar utmärkt till fisk och skaldjur.",
              en: "Dry, elegant Riesling from Alsace with clear fruit and minerality. Fresh citrus aromas and a clean, balanced palate with fine acidity. Very food friendly — excellent with fish and shellfish.",
            },
          },
          {
            name: "Moillard Chablis Coquillage",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "899:-",
            description: {
              sv: "Kraftfullt vin med toner av akacia, honung, mandel och vit persika. 20% av vinet har lagrats på franska ekfat.",
              en: "Powerful wine with notes of acacia, honey, almond and white peach. 20% aged in French oak.",
            },
          },
          {
            name: "Caiado Branco 2022",
            meta: { sv: "Portugal", en: "Portugal" },
            bottlePrice: "599:-",
            description: {
              sv: "Lätt intensitet, kristallklart med citrongul nyans. Ung och frisk doft med citrus, tropiska frukter och en lätt blommig ton. Extremt aromatiskt och livfullt med lång, uppfriskande avslutning. 35% Antão-Vaz / 35% Arinto / 30% Roupeiro.",
              en: "Light intensity, crystal clear with a lemon-yellow hue. Young, fresh nose of citrus, tropical fruit and a light floral note. Extremely aromatic and lively with a long, refreshing finish. 35% Antão-Vaz / 35% Arinto / 30% Roupeiro.",
            },
          },
        ],
      },
      {
        id: "rose",
        icon: "glass",
        title: { sv: "Rosé Viner", en: "Rosé Wines" },
        type: "dish",
        items: [
          {
            name: "La Primizie",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "109:-",
            bottlePrice: "399:-",
          },
          {
            name: "Molinara Veneto",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "119:-",
            bottlePrice: "449:-",
            mark: { sv: "Egen import", en: "Our own import" },
            description: {
              sv: "Somrigt och mjukt med en bestämd, fräsch och kryddig känsla. En liten bitter ton i avslutningen. Intensiv, doftande, blommig och fruktig arom.",
              en: "Summery and soft with a firm, fresh and spicy character. A slight bitter note on the finish. Intense, fragrant, floral and fruity aroma.",
            },
          },
          {
            name: "Les Deux Pins Merlot Rosé",
            meta: { sv: "Frankrike", en: "France" },
            glassPrice: "129:-",
            bottlePrice: "499:-",
            description: {
              sv: "Fräscht och fruktigt med inslag av hallon och granatäpple. Serveras till somriga sallader eller rätter av ljust kött.",
              en: "Fresh and fruity with raspberry and pomegranate. Serve with summer salads or white meat.",
            },
          },
          {
            name: "Château du Trignon Rosé",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "699:-",
            description: {
              sv: "Bärig och lite blommig doft med smultron och jordgubbar. Välbalanserad, mjuk och fruktig med toner av örter och blodapelsin.",
              en: "Berry-driven, slightly floral nose of wild strawberry and strawberry. Well balanced, soft and fruity with herbs and blood orange.",
            },
          },
          {
            name: "Terrebonne Côtes de Provence",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "599:-",
            description: {
              sv: "Elegant rosé från hjärtat av Provence på Cinsault, Grenache och Syrah. Ljus, klar färg med aromer av persika och färska röda frukter. Torr, frisk och välbalanserad — perfekt som aperitif eller till somriga rätter.",
              en: "Elegant rosé from the heart of Provence on Cinsault, Grenache and Syrah. Pale, clear colour with peach and fresh red fruit. Dry, fresh and well balanced — perfect as an aperitif or with summer dishes.",
            },
          },
          {
            name: "Caiado Rosé",
            meta: { sv: "Portugal", en: "Portugal" },
            bottlePrice: "599:-",
            description: {
              sv: "Mjuk, nästan laxrosa färg med delikat och genomskinligt utseende. Doften för tankarna till färsk frukt med syrlighet och exotiska toner. Fruktens intensitet kulminerar i en lång och livfull eftersmak.",
              en: "Soft, almost salmon-pink colour with a delicate, translucent look. The nose suggests fresh fruit with tartness and exotic notes. The fruit intensity culminates in a long, lively finish.",
            },
          },
        ],
      },
      {
        id: "rott",
        icon: "glass",
        title: { sv: "Röda Viner", en: "Red Wines" },
        type: "dish",
        items: [
          {
            name: "La Primizie",
            meta: { sv: "Italien · Corvina", en: "Italy · Corvina" },
            glassPrice: "109:-",
            bottlePrice: "389:-",
          },
          {
            name: "Corvina Veronese",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "119:-",
            bottlePrice: "449:-",
            mark: { sv: "Egen import", en: "Our own import" },
            description: {
              sv: "Intensiv rubinröd färg med intensiva aromer. Inslag av morellokörsbär — mjuk, behaglig och ihållande i gommen.",
              en: "Intense ruby red with intense aromas. Morello cherry — soft, pleasant and persistent on the palate.",
            },
          },
          {
            name: "Le Pirre Nero d'Avola",
            meta: { sv: "Italien", en: "Italy" },
            glassPrice: "139:-",
            bottlePrice: "499:-",
            description: {
              sv: "Medelfylligt med djup färg, mörka körsbär, viss kryddighet och balanserat avslut.",
              en: "Medium bodied with deep colour, dark cherry, some spice and a balanced finish.",
            },
          },
          {
            name: "Les Deux Pins Cabernet Sauvignon",
            meta: { sv: "Frankrike", en: "France" },
            bottlePrice: "599:-",
            description: {
              sv: "Fruktigt och kryddigt med karaktär av röda bär och svarta vinbär samt inslag av lakrits. Serveras till rött kött, vilt och charkuterier.",
              en: "Fruity and spicy with red berries, blackcurrant and a hint of liquorice. Serve with red meat, game and charcuterie.",
            },
          },
          {
            name: "Silvano Piacentini Valpolicella Superiore Ripasso Organic",
            meta: { sv: "Italien", en: "Italy" },
            bottlePrice: "899:-",
            description: {
              sv: "Corvina, Rondinella, Molinara. Medelfylligt med viss mognad, integrerad strävhet och mjuk syra. Toner av söta körsbär, mörk choklad, cederträ och chokladpralin.",
              en: "Corvina, Rondinella, Molinara. Medium bodied with some maturity, integrated tannin and soft acidity. Notes of sweet cherry, dark chocolate, cedar and chocolate praline.",
            },
          },
          {
            name: "Silvano Piacentini Amarone della Valpolicella",
            meta: { sv: "Italien", en: "Italy" },
            bottlePrice: "1499:-",
            description: {
              sv: "Corvina, Corvinone, Rondinella. Djup färg, enorm koncentration och komplexitet. Fylligt med pondus, balanserad strävhet och fräsch syrlighet. Solmogen bärighet av mörka körsbär, drottningsylt och torkade tranbär med pomerans, julkryddor, torkade dadlar, höstskog, nötchoklad, rökt chark och sötlakrits. Lång och helt underbar eftersmak.",
              en: "Corvina, Corvinone, Rondinella. Deep colour, enormous concentration and complexity. Full bodied with authority, balanced tannin and fresh acidity. Sun-ripe dark cherry, berry preserve and dried cranberry with bitter orange, Christmas spice, dried dates, autumn forest, nut chocolate, smoked charcuterie and sweet liquorice. A long, quite wonderful finish.",
            },
          },
        ],
      },
      {
        id: "vogadori",
        icon: "bottle",
        title: { sv: "Fratelli Vogadori", en: "Fratelli Vogadori" },
        type: "dish",
        note: {
          sv: "Dessa viner importerar vi själva från Italien med hjälp av Sjövik Import — och de finns endast i denna restaurang i hela Sverige.",
          en: "We import these wines ourselves from Italy with the help of Sjövik Import — and they are available in no other restaurant in Sweden.",
        },
        items: [
          {
            name: "Valpolicella Classic",
            bottlePrice: "499:-",
            description: {
              sv: "Corvina, Molinara, Corvinone. Rubinrött med fin kryddighet och tydliga fruktiga inslag. Balanserat, smakrikt och behagligt i mitten av gommen.",
              en: "Corvina, Molinara, Corvinone. Ruby red with fine spice and clear fruit. Balanced, flavourful and pleasant through the mid-palate.",
            },
          },
          {
            name: "Valpolicella Ripasso",
            bottlePrice: "899:-",
            description: {
              sv: "Corvina, Molinara, Corvinone. Fyllig, strukturerad, omslutande och uthållig. Djupt granatröd med fin kryddighet och tydlig frukt. Lagom syrligt i munnen.",
              en: "Corvina, Molinara, Corvinone. Full, structured, enveloping and persistent. Deep garnet with fine spice and clear fruit. Nicely balanced acidity.",
            },
          },
          {
            name: "Raffaello Rosso Veronese",
            bottlePrice: "1199:-",
            description: {
              sv: "Framtaget som en hyllning till bröderna Vogadoris pappa, på Corvina och Corvinone. Intensiv rubinröd färg med aromer av mogen frukt, körsbär och torkade blommor. Elegant och mycket ihållande — ett meditationsvin som gör sig fint på egen hand, men passar även till rött kött.",
              en: "Created as a tribute to the Vogadori brothers' father, on Corvina and Corvinone. Intense ruby red with aromas of ripe fruit, cherry and dried flowers. Elegant and very persistent — a meditation wine that shines on its own, but also pairs with red meat.",
            },
          },
        ],
      },
    ],
  },

  {
    id: "sprit",
    icon: "spirit",
    title: { sv: "Sprit", en: "Spirits" },
    image: "/images/drinks/pp-passion.jpeg",
    imageAlt: { sv: "Drinkar i kristallglas", en: "Cocktails in crystal glasses" },
    note: {
      sv: "Serveras som 4 cl. Fråga i baren om pris och vad vi har inne just nu — sortimentet växlar.",
      en: "Served as 4 cl. Ask at the bar for prices and what we have in right now — the range changes.",
    },
    sections: [
      {
        id: "whisky",
        icon: "spirit",
        title: { sv: "Whisky", en: "Whisky" },
        type: "plain",
        items: [
          { name: "The Glenlivet 21 Year", meta: { sv: "Skottland", en: "Scotland" } },
          { name: "Glenfiddich", meta: { sv: "Skottland", en: "Scotland" } },
          { name: "Maker's Mark 46", meta: { sv: "USA", en: "USA" } },
          { name: "Four Roses", meta: { sv: "USA", en: "USA" } },
          { name: "Laphroaig", meta: { sv: "Skottland", en: "Scotland" } },
          { name: "Redbreast 15 Years", meta: { sv: "Irland", en: "Ireland" } },
          { name: "Jameson Black Barrel", meta: { sv: "Irland", en: "Ireland" } },
          { name: "The Famous Grouse", meta: { sv: "Skottland", en: "Scotland" } },
          { name: "Grant's", meta: { sv: "Skottland", en: "Scotland" } },
        ],
      },
      {
        id: "cognac",
        icon: "spirit",
        title: { sv: "Cognac", en: "Cognac" },
        type: "plain",
        items: [
          { name: "Martell XO", meta: { sv: "Frankrike", en: "France" } },
          { name: "Meukow de Luxe", meta: { sv: "Frankrike", en: "France" } },
          {
            name: "Grönstedts Monopole VSOP",
            meta: { sv: "Frankrike", en: "France" },
          },
          { name: "Grönstedts VS", meta: { sv: "Frankrike", en: "France" } },
          { name: "Martell VS", meta: { sv: "Frankrike", en: "France" } },
          { name: "Martell VSOP R", meta: { sv: "Frankrike", en: "France" } },
        ],
      },
      {
        id: "gin",
        icon: "spirit",
        title: { sv: "Gin", en: "Gin" },
        type: "plain",
        items: [
          {
            name: "Nyfjäll Västkustgin",
            meta: {
              sv: "Old Tom · Navy Strength · Lysekil",
              en: "Old Tom · Navy Strength · Lysekil",
            },
          },
          { name: "Hendrick's", meta: { sv: "Skottland", en: "Scotland" } },
          { name: "Monkey 47", meta: { sv: "Tyskland", en: "Germany" } },
          { name: "Malfy", meta: { sv: "Italien", en: "Italy" } },
          { name: "Malfy Rosa", meta: { sv: "Italien", en: "Italy" } },
          { name: "Plymouth", meta: { sv: "England", en: "England" } },
          { name: "Klocktornet", meta: { sv: "Lokalt", en: "Local" } },
          { name: "Blue Velvet", meta: { sv: "Spanien", en: "Spain" } },
        ],
      },
      {
        id: "snaps",
        icon: "spirit",
        title: { sv: "Snaps & Likör", en: "Schnapps & Liqueur" },
        type: "plain",
        items: [
          { name: "Precis Vodka Pistachio", meta: { sv: "Sverige", en: "Sweden" } },
          { name: "Precis Vodka", meta: { sv: "Sverige", en: "Sweden" } },
          { name: "Precis Aquavit", meta: { sv: "Sverige", en: "Sweden" } },
          { name: "Grappa e Miele", meta: { sv: "Italien", en: "Italy" } },
          { name: "Limoncello", meta: { sv: "Italien", en: "Italy" } },
          {
            name: "Olmeca Altos 100% Agave",
            meta: { sv: "Mexiko", en: "Mexico" },
          },
          {
            name: "Ricard Pastis de Marseille",
            meta: { sv: "Frankrike", en: "France" },
          },
        ],
      },
    ],
  },
];
