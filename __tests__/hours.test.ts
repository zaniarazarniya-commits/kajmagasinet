import { HOUR_GROUPS, getHourRows, getOpeningStatus, openingHoursSpecification } from "@/lib/hours";

/** Svensk sommartid (+02:00) — statusen räknas mot klockan i Lysekil. */
function at(year: number, month: number, day: number, hour: number, minute = 0) {
  const p = (n: number) => String(n).padStart(2, "0");
  return new Date(`${year}-${p(month)}-${p(day)}T${p(hour)}:${p(minute)}:00+02:00`);
}

describe("getOpeningStatus", () => {
  it("är öppet mitt på dagen en onsdag", () => {
    // 2026-07-29 är en onsdag.
    const status = getOpeningStatus(at(2026, 7, 29, 13));
    expect(status.open).toBe(true);
    expect(status.todayLabel).toBe("11–23");
  });

  it("är stängt före öppning", () => {
    const status = getOpeningStatus(at(2026, 7, 29, 9));
    expect(status.open).toBe(false);
    expect(status.opensLabel).toBe("11");
  });

  it("normaliserar stängning efter midnatt", () => {
    // 2026-07-31 är en fredag: 11–01.
    const status = getOpeningStatus(at(2026, 7, 31, 22));
    expect(status.open).toBe(true);
    expect(status.closesLabel).toBe("01");
  });

  it("räknar småtimmarna till gårdagens öppettid", () => {
    // 00:30 natten mot lördag — getDay() har redan rullat över till lördag,
    // men gästen sitter kvar på fredagens pass.
    const status = getOpeningStatus(at(2026, 8, 1, 0, 30));
    expect(status.open).toBe(true);
  });

  it("visar lördagens stängningstid natten mot söndag", () => {
    // 00:30 natten mot söndag 2026-08-02 — lördagens pass pågår till 01.
    const status = getOpeningStatus(at(2026, 8, 2, 0, 30));
    expect(status.open).toBe(true);
    expect(status.closesLabel).toBe("01");
  });

  it("visar måndagens öppning efter stängning på söndag", () => {
    // Söndag 2026-08-02 kl. 22:30 — nästa öppning är måndag 11.
    const status = getOpeningStatus(at(2026, 8, 2, 22, 30));
    expect(status.open).toBe(false);
    expect(status.opensLabel).toBe("11");
    expect(status.opensTomorrow).toBe(true);
  });

  it("visar dagens öppning före öppning på söndag", () => {
    const status = getOpeningStatus(at(2026, 8, 2, 10));
    expect(status.open).toBe(false);
    expect(status.opensLabel).toBe("12");
    expect(status.opensTomorrow).toBe(false);
  });

  it("räknar efter svensk tid även när gästens telefon går i en annan tidszon", () => {
    // Onsdag 23:30 i Lysekil är 22:30 i London. Stängt, oavsett gästens klocka.
    const status = getOpeningStatus(new Date("2026-07-29T22:30:00+01:00"));
    expect(status.open).toBe(false);
    expect(status.day).toBe(3);
  });

  it("räknar vintertid rätt", () => {
    // Onsdag 2026-12-02 kl. 22:30 svensk vintertid (+01:00) — öppet till 23.
    const status = getOpeningStatus(new Date("2026-12-02T22:30:00+01:00"));
    expect(status.open).toBe(true);
    expect(status.closesLabel).toBe("23");
  });

  it("är stängt på småtimmarna en vanlig veckonatt", () => {
    // 00:30 natten mot torsdag — torsdag öppnar först 11.
    const status = getOpeningStatus(at(2026, 7, 30, 0, 30));
    expect(status.open).toBe(false);
  });
});

describe("getHourRows", () => {
  it("markerar exakt en rad som dagens", () => {
    const rows = getHourRows("sv", 3);
    expect(rows.filter((row) => row.today)).toHaveLength(1);
    expect(rows.find((row) => row.today)?.label).toBe("Måndag – Torsdag");
  });

  it("översätter etiketterna", () => {
    expect(getHourRows("en", 0)[2].label).toBe("Sunday");
  });
});

describe("openingHoursSpecification", () => {
  it("täcker veckans alla sju dagar", () => {
    const days = openingHoursSpecification.flatMap((spec) =>
      Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek],
    );
    expect(new Set(days).size).toBe(7);
  });

  it("härleds ur samma grupper som visningsraderna", () => {
    expect(openingHoursSpecification).toHaveLength(HOUR_GROUPS.length);
  });
});
