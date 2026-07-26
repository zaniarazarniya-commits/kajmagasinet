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
  /** Veckodag som statusen gäller, enligt Date.getDay(). */
  day: number;
  /** Öppningstimme idag, t.ex. "11". */
  opensLabel: string;
  /** Stängningstimme idag, normaliserad förbi midnatt, t.ex. "01". */
  closesLabel: string;
  /** "11–23" för dagens chip i infobaren. */
  todayLabel: string;
};

/**
 * Räknar ut om restaurangen är öppen just nu.
 *
 * Hanterar även småtimmarna: efter midnatt natten mot lördag/söndag har
 * `getDay()` redan rullat över, så gårdagens fönster måste vägas in.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  const [opens, closes] = HOURS[day];
  let open = hour >= opens && hour < closes;

  if (!open) {
    const yesterday = (day + 6) % 7;
    const [, closesYesterday] = HOURS[yesterday];
    if (closesYesterday > 24 && hour < closesYesterday - 24) {
      open = true;
    }
  }

  const closesNormalised = closes > 24 ? closes - 24 : closes;

  return {
    open,
    day,
    opensLabel: pad(opens),
    closesLabel: pad(closesNormalised),
    todayLabel: `${pad(opens)}–${pad(closesNormalised)}`,
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
