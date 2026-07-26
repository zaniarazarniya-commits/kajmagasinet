import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/constants";

function renderFooter() {
  return render(
    <LanguageProvider>
      <SiteFooter />
    </LanguageProvider>,
  );
}

describe("SiteFooter", () => {
  it("visar kontaktuppgifterna", () => {
    renderFooter();
    expect(screen.getByText(SITE.address)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: SITE.phone })).toHaveAttribute(
      "href",
      `tel:${SITE.phoneTel}`,
    );
  });

  it("behåller Infrakust-bandet", () => {
    renderFooter();
    const credit = screen.getByRole("link", { name: /Infrakust/i });
    expect(credit).toHaveAttribute("href", "https://www.infrakust.se");
    expect(credit).toHaveAttribute("target", "_blank");
  });
});
