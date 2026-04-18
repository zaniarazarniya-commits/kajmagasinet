import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Menu } from "@/components/sections/Menu";
import { MENU_CATEGORIES } from "@/lib/constants";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.PropsWithChildren<object>) => <div {...p}>{children}</div>,
    p: ({ children, ...p }: React.PropsWithChildren<object>) => <p {...p}>{children}</p>,
    h2: ({ children, ...p }: React.PropsWithChildren<object>) => <h2 {...p}>{children}</h2>,
    li: ({ children, ...p }: React.PropsWithChildren<object>) => <li {...p}>{children}</li>,
    a: ({ children, ...p }: React.PropsWithChildren<object>) => <a {...p}>{children}</a>,
    button: ({ children, ...p }: React.PropsWithChildren<object>) => <button {...p}>{children}</button>,
    ul: ({ children, ...p }: React.PropsWithChildren<object>) => <ul {...p}>{children}</ul>,
  },
}));

describe("Menu", () => {
  it("renders all three menu categories", () => {
    render(<Menu />);
    MENU_CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat.title)).toBeInTheDocument();
    });
  });

  it("renders Köket category", () => {
    render(<Menu />);
    expect(screen.getByText("Köket")).toBeInTheDocument();
  });

  it("renders Baren category", () => {
    render(<Menu />);
    expect(screen.getByText("Baren")).toBeInTheDocument();
  });

  it("renders full menu CTA", () => {
    render(<Menu />);
    expect(screen.getByText(/fullständig meny/i)).toBeInTheDocument();
  });
});
