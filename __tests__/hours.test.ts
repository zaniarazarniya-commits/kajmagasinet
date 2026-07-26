import { HOUR_GROUPS, getHourRows, getOpeningStatus, openingHoursSpecification } from "@/lib/hours";

/** Lokal tid — statusen räknas mot gästens klocka. */
function at(year: number, month: number, day: number, hour: number, minute = 0) {
  return new Date(year, month - 1, day, hour, minute);
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
