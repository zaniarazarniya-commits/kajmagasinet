import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { FindUs } from "@/components/sections/FindUs";
import { SITE, OPENING_HOURS } from "@/lib/constants";

jest.mock("framer-motion", () => {
  const FM = ["whileHover", "whileTap", "whileInView", "initial", "animate", "exit", "variants", "viewport", "transition"];
  const el = (tag: string) =>
    ({ children, ...p }: React.PropsWithChildren<Record<string, unknown>>) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(p)) { if (!FM.includes(k)) clean[k] = v; }
      return React.createElement(tag, clean, children);
    };
  return {
    motion: { section: el("section"), div: el("div"), p: el("p"), h2: el("h2"), dl: el("dl"), a: el("a"), button: el("button"), blockquote: el("blockquote"), header: el("header") },
  };
});

describe("FindUs", () => {
  it("renders the address", () => {
    render(<FindUs />);
    expect(screen.getAllByText(SITE.address).length).toBeGreaterThan(0);
  });

  it("renders opening hours days", () => {
    render(<FindUs />);
    OPENING_HOURS.forEach((row) => {
      expect(screen.getByText(row.day)).toBeInTheDocument();
    });
  });

  it("renders opening hours times", () => {
    render(<FindUs />);
    OPENING_HOURS.forEach((row) => {
      expect(screen.getAllByText(row.time).length).toBeGreaterThan(0);
    });
  });

  it("renders phone number", () => {
    render(<FindUs />);
    expect(screen.getByText(SITE.phone)).toBeInTheDocument();
  });

  it("has a directions link", () => {
    render(<FindUs />);
    expect(screen.getByText(/vägbeskrivning/i)).toBeInTheDocument();
  });
});
