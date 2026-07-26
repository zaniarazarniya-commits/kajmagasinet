import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { MENU } from "@/lib/menu-data";

function renderMenu() {
  return render(
    <LanguageProvider>
      <MenuBrowser />
    </LanguageProvider>,
  );
}

describe("MenuBrowser", () => {
  it("visar kostlegenden före innehållet", () => {
    const { container } = renderMenu();
    const legend = container.querySelector(".legend");
    expect(legend).toBeInTheDocument();
    ["V", "VE", "GF", "S", "F"].forEach((code) => {
      expect(within(legend as HTMLElement).getByText(code)).toBeInTheDocument();
    });
  });

  it("listar alla fyra grupper i översta navraden", () => {
    const { container } = renderMenu();
    const groups = container.querySelector(".catrow.groups");
    expect(groups?.children).toHaveLength(MENU.length);
  });

  it("visar undersektionerna för den aktiva gruppen", () => {
    const { container } = renderMenu();
    const subs = container.querySelector(".catrow.subs");
    expect(subs?.children).toHaveLength(MENU[0].sections.length);
  });

  it("renderar varje sektion med ett id att hoppa till", () => {
    const { container } = renderMenu();
    MENU.flatMap((group) => group.sections).forEach((section) => {
      expect(container.querySelector(`#${section.id}`)).toBeInTheDocument();
    });
  });

  it("etiketterar glas- och flaskpriser var för sig", () => {
    const { container } = renderMenu();
    const prosecco = Array.from(container.querySelectorAll(".row")).find((row) =>
      row.textContent?.includes("La Primizie Prosecco"),
    );
    expect(prosecco?.textContent).toContain("Glas");
    expect(prosecco?.textContent).toContain("Flaska");
  });

  it("behåller den juridiskt medvetna allergitexten", () => {
    renderMenu();
    expect(
      screen.getByText(/en vägledning, inte en garanti/i),
    ).toBeInTheDocument();
  });
});
