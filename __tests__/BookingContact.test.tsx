import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { BookingContact } from "@/components/sections/BookingContact";
import { SITE } from "@/lib/constants";

function renderSection(
  props: React.ComponentProps<typeof BookingContact> = {},
) {
  return render(
    <LanguageProvider>
      <BookingContact {...props} />
    </LanguageProvider>,
  );
}

describe("BookingContact", () => {
  it("visar formulärets alla fält", () => {
    renderSection();
    ["Datum", "Tid", "Antal gäster", "Namn", "Telefon", "E-post"].forEach(
      (label) => {
        expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
      },
    );
  });

  it("stegar antalet gäster mellan 1 och 40", async () => {
    const user = userEvent.setup();
    renderSection();
    const guests = screen.getByLabelText(/Antal gäster/i) as HTMLInputElement;
    expect(guests.value).toBe("2");

    await user.click(screen.getByRole("button", { name: /Fler gäster/i }));
    expect(guests.value).toBe("3");

    const minus = screen.getByRole("button", { name: /Färre gäster/i });
    await user.click(minus);
    await user.click(minus);
    await user.click(minus);
    expect(guests.value).toBe("1");
  });

  it("säger rakt ut att bordet är bokat först när det bekräftats", () => {
    renderSection();
    expect(
      screen.getByText(/Bordet är bokat först när vi bekräftat/i),
    ).toBeInTheDocument();
  });

  it("erbjuder telefon för sista minuten-bokningar", () => {
    renderSection();
    expect(
      screen.getAllByRole("link", { name: SITE.phone }).length,
    ).toBeGreaterThan(0);
  });

  it("har en egen vägbeskrivning-knapp som öppnas i ny flik", () => {
    renderSection();
    const link = screen.getByRole("link", { name: /Vägbeskrivning/i });
    expect(link).toHaveAttribute("href", SITE.directionsUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("låter CMS-texter skriva om öppettidsraderna", () => {
    renderSection({
      openingHoursOverride: [
        { day: "Midsommarafton", time: "Stängt" },
        { day: "Fredag – Lördag", time: "11:00 – 02:00" },
        { day: "Söndag", time: "12:00 – 22:00" },
      ],
    });
    expect(screen.getByText("Midsommarafton")).toBeInTheDocument();
    expect(screen.getByText("11:00 – 02:00")).toBeInTheDocument();
  });
});
