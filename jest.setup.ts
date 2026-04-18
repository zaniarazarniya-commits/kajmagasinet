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
