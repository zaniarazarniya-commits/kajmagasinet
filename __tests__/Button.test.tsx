import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <a {...props}>{children}</a>
    ),
  },
}));

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Boka bord</Button>);
    expect(screen.getByText("Boka bord")).toBeInTheDocument();
  });

  it("renders as anchor when href is provided", () => {
    render(<Button href="#boka">Boka bord</Button>);
    const link = screen.getByRole("link", { name: "Boka bord" });
    expect(link).toHaveAttribute("href", "#boka");
  });

  it("renders as button when no href", () => {
    render(<Button>Klicka här</Button>);
    expect(screen.getByRole("button", { name: "Klicka här" })).toBeInTheDocument();
  });

  it("applies outline variant class", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-2");
  });
});
