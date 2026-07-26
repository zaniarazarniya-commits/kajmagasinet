import { DIET_CODES, DIET_LEGEND, MENU } from "@/lib/menu-data";

const sections = MENU.flatMap((group) => group.sections);
const items = sections.flatMap((section) => section.items);

describe("menydata", () => {
  it("har fyra grupper och nitton undersektioner", () => {
    expect(MENU).toHaveLength(4);
    expect(sections).toHaveLength(19);
  });

  it("har unika ankar-id:n — navigeringen hoppar till dem", () => {
    const ids = [...MENU.map((g) => g.id), ...sections.map((s) => s.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ger varje post ett namn", () => {
    items.forEach((item) => expect(item.name.trim().length).toBeGreaterThan(0));
  });

  it("lämnar inga HTML-entiteter kvar från prototypen", () => {
    const text = JSON.stringify(MENU);
    expect(text).not.toMatch(/&amp;|&nbsp;|&lt;|&gt;/);
  });

  it("hämtar inga bilder från den gamla domänen", () => {
    MENU.forEach((group) => expect(group.image.startsWith("/")).toBe(true));
  });

  it("använder bara kostkoder som finns i legenden", () => {
    const known = new Set(DIET_LEGEND.map((entry) => entry.code));
    items.forEach((item) =>
      item.diet?.forEach((code) => expect(known.has(code)).toBe(true)),
    );
    expect(Object.keys(DIET_CODES).sort()).toEqual([...known].sort());
  });

  it("etiketterar vinpriser som glas eller flaska i stället för att slå ihop dem", () => {
    items.forEach((item) => {
      if (item.glassPrice || item.bottlePrice) {
        expect(item.price).toBeUndefined();
      }
    });
  });

  it("har både svenska och engelska i alla beskrivningar", () => {
    items.forEach((item) => {
      if (!item.description) return;
      expect(item.description.sv.trim().length).toBeGreaterThan(0);
      expect(item.description.en.trim().length).toBeGreaterThan(0);
    });
  });

  it("har Fratelli Vogadori som egen sektion — sajtens främsta säljargument", () => {
    const vogadori = sections.find((section) => section.id === "vogadori");
    expect(vogadori?.items).toHaveLength(3);
    expect(vogadori?.note?.sv).toContain("Sjövik Import");
  });
});
