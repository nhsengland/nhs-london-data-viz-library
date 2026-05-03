import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSSPCChart } from "./NHSSPCChart";
import type { SPCDataPoint } from "./NHSSPCChart";

const mockData: SPCDataPoint[] = [
  { label: "Jan", value: 74.2 },
  { label: "Feb", value: 73.8 },
  { label: "Mar", value: 75.1 },
  { label: "Apr", value: 76.3 },
  { label: "May", value: 75.9 },
  { label: "Jun", value: 74.5 },
  { label: "Jul", value: 73.2 },
  { label: "Aug", value: 71.8 },
  { label: "Sep", value: 69.5 },
  { label: "Oct", value: 72.3 },
  { label: "Nov", value: 74.8 },
  { label: "Dec", value: 75.2 },
];

describe("NHSSPCChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<NHSSPCChart data={mockData} />);
    expect(container).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<NHSSPCChart data={mockData} title="A&E Performance" />);
    expect(screen.getByText("A&E Performance")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<NHSSPCChart data={mockData} subtitle="2025/26" />);
    expect(screen.getByText("2025/26")).toBeInTheDocument();
  });

  it("renders source attribution when provided", () => {
    render(<NHSSPCChart data={mockData} source="NHS England" />);
    expect(screen.getByText(/NHS England/)).toBeInTheDocument();
  });

  it("renders variation icon by default", () => {
    const { container } = render(<NHSSPCChart data={mockData} />);
    // Should show one of the three variation states
    const text = container.textContent ?? "";
    const hasVariation =
      text.includes("Special cause") || text.includes("Common cause");
    expect(hasVariation).toBe(true);
  });

  it("hides variation icon when showVariationIcon is false", () => {
    const { container } = render(
      <NHSSPCChart data={mockData} showVariationIcon={false} />
    );
    const text = container.textContent ?? "";
    expect(text).not.toContain("Special cause");
    expect(text).not.toContain("Common cause");
  });

  it("renders as run chart without violations", () => {
    const { container } = render(
      <NHSSPCChart data={mockData} chartType="run" showViolations={false} showVariationIcon={false} />
    );
    expect(container).toBeInTheDocument();
    expect(container.textContent).not.toContain("special cause signal");
  });

  it("renders with c-chart type", () => {
    const countData: SPCDataPoint[] = [
      { label: "Jan", value: 12 },
      { label: "Feb", value: 8 },
      { label: "Mar", value: 11 },
      { label: "Apr", value: 9 },
      { label: "May", value: 10 },
      { label: "Jun", value: 7 },
    ];
    const { container } = render(<NHSSPCChart data={countData} chartType="c-chart" />);
    expect(container).toBeInTheDocument();
  });

  it("renders with empty data without crashing", () => {
    const { container } = render(<NHSSPCChart data={[]} />);
    expect(container).toBeInTheDocument();
  });
});
