import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renderar barn", () => {
    render(<Button icon="cal">Boka bord</Button>);
    expect(screen.getByText("Boka bord")).toBeInTheDocument();
  });

  it("blir en länk när href anges", () => {
    render(
      <Button icon="cal" href="#boka">
        Boka bord
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Boka bord" })).toHaveAttribute(
      "href",
      "#boka",
    );
  });

  it("blir en knapp utan href", () => {
    render(<Button icon="mail">Skicka förfrågan</Button>);
    expect(
      screen.getByRole("button", { name: "Skicka förfrågan" }),
    ).toBeInTheDocument();
  });

  it("sätter klass för vald variant", () => {
    render(
      <Button icon="glass" variant="ghost">
        Se vinlistan
      </Button>,
    );
    expect(screen.getByRole("button").className).toContain("btn-ghost");
  });

  it("bär alltid en ikon — knappen får inte förlita sig på text ensam", () => {
    const { container } = render(<Button icon="phone">Ring oss</Button>);
    expect(container.querySelector("button svg")).toBeInTheDocument();
  });
});
