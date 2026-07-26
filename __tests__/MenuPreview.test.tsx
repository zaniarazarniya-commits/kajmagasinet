import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { PREVIEW_DISHES } from "@/lib/content";

function renderWithLanguage(ui: React.ReactNode) {
  return render(
    <LanguageProvider>
      <LangSwitch />
      {ui}
    </LanguageProvider>,
  );
}

describe("MenuPreview", () => {
  beforeEach(() => window.localStorage.clear());

  it("visar de sex utvalda rätterna med pris", () => {
    renderWithLanguage(<MenuPreview />);
    PREVIEW_DISHES.forEach((dish) => {
      expect(screen.getByText(dish.name)).toBeInTheDocument();
      expect(screen.getAllByText(dish.price).length).toBeGreaterThan(0);
    });
  });

  it("länkar vidare till hela menyn", () => {
    renderWithLanguage(<MenuPreview />);
    expect(
      screen.getByRole("link", { name: /Hela menyn & vinlistan/i }),
    ).toHaveAttribute("href", "/meny");
  });

  it("byter till engelska när språkväxlaren används", async () => {
    const user = userEvent.setup();
    renderWithLanguage(<MenuPreview />);

    expect(screen.getByText("Ett urval ur menyn")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /English/i }));
    expect(screen.getByText("A selection from the menu")).toBeInTheDocument();
  });
});
