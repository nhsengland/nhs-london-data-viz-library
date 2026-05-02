import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSLogo } from "./NHSLogo";

describe("NHSLogo", () => {
  it("renders SVG element", () => {
    const { container } = render(<NHSLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom height", () => {
    const { container } = render(<NHSLogo height={64} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("height", "64");
  });

  it("renders white variant", () => {
    const { container } = render(<NHSLogo variant="white" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders blue variant by default", () => {
    const { container } = render(<NHSLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
