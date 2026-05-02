import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSKPICard } from "./NHSKPICard";

describe("NHSKPICard", () => {
  it("renders title and value", () => {
    render(<NHSKPICard title="Bed Occupancy" value="94.2%" />);
    expect(screen.getByText("Bed Occupancy")).toBeInTheDocument();
    expect(screen.getByText("94.2%")).toBeInTheDocument();
  });

  it("renders value with unit separately", () => {
    render(<NHSKPICard title="Wait Time" value="18.3" unit="weeks" />);
    expect(screen.getByText("18.3")).toBeInTheDocument();
    expect(screen.getByText("weeks")).toBeInTheDocument();
  });

  it("renders trend value and label when provided", () => {
    const { container } = render(
      <NHSKPICard title="Admissions" value="2.3M" trend="up" trendValue="+3.2%" trendLabel="vs last month" />
    );
    // trendValue is rendered combined with the arrow: "▲ +3.2%"
    expect(container.textContent).toContain("+3.2%");
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("renders up arrow for upward trend", () => {
    const { container } = render(
      <NHSKPICard title="Test" value="100" trend="up" trendValue="+5%" />
    );
    expect(container.textContent).toContain("▲");
  });

  it("renders down arrow for downward trend", () => {
    const { container } = render(
      <NHSKPICard title="Test" value="100" trend="down" trendValue="-2%" />
    );
    expect(container.textContent).toContain("▼");
  });

  it("renders without crashing when minimal props given", () => {
    const { container } = render(<NHSKPICard title="Test" value="0" />);
    expect(container).toBeInTheDocument();
  });
});
