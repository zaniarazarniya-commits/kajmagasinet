import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

jest.mock("framer-motion", () => {
  const FM = [
    "whileHover",
    "whileTap",
    "whileInView",
    "initial",
    "animate",
    "exit",
    "variants",
    "viewport",
    "transition",
  ];
  const el =
    (tag: string) =>
    ({ children, ...p }: React.PropsWithChildren<Record<string, unknown>>) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(p)) {
        if (!FM.includes(k)) clean[k] = v;
      }
      return React.createElement(tag, clean, children);
    };
  return {
    motion: {
      section: el("section"),
      div: el("div"),
      p: el("p"),
      h1: el("h1"),
      a: el("a"),
      button: el("button"),
      header: el("header"),
    },
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
  };
});

describe("Hero", () => {
  it("renders the Swedish headline", () => {
    render(<Hero />);
    expect(screen.getByText("Kajmagasinet")).toBeInTheDocument();
  });

  it("renders Boka bord CTA", () => {
    render(<Hero />);
    expect(screen.getAllByText(/Boka bord/i).length).toBeGreaterThan(0);
  });

  it("renders Se menyn CTA", () => {
    render(<Hero />);
    expect(screen.getByText(/Se menyn/i)).toBeInTheDocument();
  });

  it("renders the location eyebrow text", () => {
    render(<Hero />);
    expect(screen.getAllByText(/Lysekil/i).length).toBeGreaterThan(0);
  });
});
