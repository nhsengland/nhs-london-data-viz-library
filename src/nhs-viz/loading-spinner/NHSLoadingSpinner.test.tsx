import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSLoadingSpinner } from "./NHSLoadingSpinner";

describe("NHSLoadingSpinner", () => {
  it("renders default loading message", () => {
    render(<NHSLoadingSpinner />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<NHSLoadingSpinner message="Fetching results..." />);
    expect(screen.getByText("Fetching results...")).toBeInTheDocument();
  });

  it("renders spinner SVG element", () => {
    const { container } = render(<NHSLoadingSpinner />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("hides message when empty string provided", () => {
    render(<NHSLoadingSpinner message="" />);
    expect(screen.queryByText("Loading data...")).not.toBeInTheDocument();
  });
});
