/**
 * Öppettider — en källa för hela sajten.
 *
 * Tidigare låg tiderna på tre ställen (JSON-LD, statusberäkning och
 * visningsetiketter) och gled isär. Allt nedan härleds ur `HOURS`.
 */

import type { Lang, Loc } from "@/lib/i18n";

/**
 * Öppettider per veckodag enligt `Date.getDay()` (0 = söndag).
 * Stängning efter midnatt uttrycks som > 24 — fre/lör 25 = 01:00.
 */
export const HOURS: Record<number, readonly [number, number]> = {
  0: [12, 22],
  1: [11, 23],
  2: [11, 23],
  3: [11, 23],
  4: [11, 23],
  5: [11, 25],
  6: [11, 25],
};

export type HourGroup = {
  /** Veckodagar enligt Date.getDay(). */
  days: readonly number[];
  label: Loc;
  time: string;
  /** ISO-tider för JSON-LD. */
  opens: string;
  closes: string;
  schemaDays: readonly string[];
};

export const HOUR_GROUPS: readonly HourGroup[] = [
  {
    days: [1, 2, 3, 4],
    label: { sv: "Måndag – Torsdag", en: "Monday – Thursday" },
    time: "11:00 – 23:00",
    opens: "11:00",
    closes: "23:00",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  {
    days: [5, 6],
    label: { sv: "Fredag – Lördag", en: "Friday – Saturday" },
    time: "11:00 – 01:00",
    opens: "11:00",
    closes: "01:00",
    schemaDays: ["Friday", "Saturday"],
  },
  {
    days: [0],
    label: { sv: "Söndag", en: "Sunday" },
    time: "12:00 – 22:00",
    opens: "12:00",
    closes: "22:00",
    schemaDays: ["Sunday"],
  },
];

/** openingHoursSpecification till JSON-LD, härlett ur HOUR_GROUPS. */
export const openingHoursSpecification = HOUR_GROUPS.map((g) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: g.schemaDays.length === 1 ? g.schemaDays[0] : [...g.schemaDays],
  opens: g.opens,
  closes: g.closes,
}));

function pad(hour: number): string {
  return String(Math.floor(hour)).padStart(2, "0");
}

export type OpeningStatus = {
  open: boolean;
  /** Veckodag i Lysekil som statusen gäller, enligt Date.getDay(). */
  day: number;
  /** Nästa öppningstimme, t.ex. "11" (i morgon om dagens pass är slut). */
  opensLabel: string;
  /** True när dagens pass är slut och nästa öppning är i morgon. */
  opensTomorrow: boolean;
  /** Stängningstimme för passet som pågår, normaliserad förbi midnatt, t.ex. "01". */
  closesLabel: string;
  /** "11–23" för dagens chip i infobaren. */
  todayLabel: string;
};

const WEEKDAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const stockholmClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Stockholm",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * Veckodag och klockslag i Lysekil. Gästens telefon kan gå i en annan
 * tidszon (turister, seglare), men restaurangen öppnar efter svensk tid.
 */
function stockholmNow(now: Date): { day: number; hour: number } {
  const parts = Object.fromEntries(
    stockholmClock.formatToParts(now).map((part) => [part.type, part.value]),
  );
  return {
    day: WEEKDAYS[parts.weekday],
    hour: Number(parts.hour) + Number(parts.minute) / 60,
  };
}

function normalise(hour: number): number {
  return hour > 24 ? hour - 24 : hour;
}

/**
 * Räknar ut om restaurangen är öppen just nu.
 *
 * Hanterar även småtimmarna: efter midnatt natten mot lördag/söndag har
 * veckodagen redan rullat över, så gårdagens pass måste vägas in. Då gäller
 * också gårdagens stängningstid.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const { day, hour } = stockholmNow(now);

  const [opens, closes] = HOURS[day];
  const [, closesYesterday] = HOURS[(day + 6) % 7];
  const [opensTomorrow] = HOURS[(day + 1) % 7];

  const openFromYesterday = closesYesterday > 24 && hour < closesYesterday - 24;
  const openToday = hour >= opens && hour < closes;
  const open = openFromYesterday || openToday;

  const closesNow = openFromYesterday ? closesYesterday : closes;
  // Är dagens pass redan slut öppnar vi nästa gång i morgon.
  const tomorrow = hour >= closes;
  const nextOpens = tomorrow ? opensTomorrow : opens;

  return {
    open,
    day,
    opensLabel: pad(nextOpens),
    opensTomorrow: tomorrow,
    closesLabel: pad(normalise(closesNow)),
    todayLabel: `${pad(opens)}–${pad(normalise(closes))}`,
  };
}

/** Rader till öppettidslistan, med markering av dagens rad. */
export function getHourRows(lang: Lang, day: number) {
  return HOUR_GROUPS.map((group) => ({
    label: group.label[lang],
    time: group.time,
    today: group.days.includes(day),
  }));
}
