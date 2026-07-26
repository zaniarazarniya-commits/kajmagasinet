import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(
    props: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }
  ) {
    const { src, alt, ...rest } = props;
    return React.createElement("img", {
      src: typeof src === "string" ? src : "",
      alt: alt ?? "",
      ...rest,
    });
  },
}));

// jsdom saknar observers och matchMedia; komponenterna använder alla tre.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: NoopObserver,
});
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: NoopObserver,
});
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Används av drinkkarusellen; finns inte i jsdom.
Object.defineProperty(Element.prototype, "scrollTo", {
  writable: true,
  value: () => {},
});
