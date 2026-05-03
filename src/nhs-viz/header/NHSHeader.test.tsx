import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NHSHeader } from "./NHSHeader";

describe("NHSHeader", () => {
  it("renders title", () => {
    render(<NHSHeader title="My Dashboard" />);
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<NHSHeader title="Dashboard" subtitle="London Region" />);
    expect(screen.getByText("London Region")).toBeInTheDocument();
  });

  it("renders NHS logo SVG", () => {
    const { container } = render(<NHSHeader title="Test" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders hamburger button with aria-label", () => {
    render(<NHSHeader title="Test" />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("calls onMenuToggle when hamburger clicked", () => {
    const onToggle = vi.fn();
    render(<NHSHeader title="Test" onMenuToggle={onToggle} menuOpen={false} />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("toggles aria-expanded on hamburger click", () => {
    render(<NHSHeader title="Test" menuOpen={true} onMenuToggle={() => {}} />);
    expect(screen.getByLabelText("Close menu")).toHaveAttribute("aria-expanded", "true");
  });

  it("renders data freshness bar when provided", () => {
    render(
      <NHSHeader
        title="Test"
        dataFreshness={{ lastRefreshed: "30 April 2026", latestDataAvailable: "March 2026" }}
      />
    );
    expect(screen.getByText(/30 April 2026/)).toBeInTheDocument();
    expect(screen.getByText(/March 2026/)).toBeInTheDocument();
  });

  it("does not render data freshness bar when not provided", () => {
    const { container } = render(<NHSHeader title="Test" />);
    expect(container.textContent).not.toContain("Data last refreshed");
  });
});
