import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSSparkline } from "./NHSSparkline";

describe("NHSSparkline", () => {
  it("renders without crashing", () => {
    const { container } = render(<NHSSparkline data={[10, 20, 30, 25]} />);
    expect(container).toBeInTheDocument();
  });

  it("renders label when showLabel is true", () => {
    render(<NHSSparkline data={[10, 20, 30]} showLabel label="Trend" />);
    expect(screen.getByText("Trend")).toBeInTheDocument();
  });

  it("renders latest value when showValue is true", () => {
    render(<NHSSparkline data={[10, 20, 30]} showValue />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders a container element for the chart", () => {
    const { container } = render(<NHSSparkline data={[5, 10, 15]} />);
    // Recharts ResponsiveContainer may not render SVG in jsdom without ResizeObserver
    expect(container.firstChild).toBeInTheDocument();
  });
});
