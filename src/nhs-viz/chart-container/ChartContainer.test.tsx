import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChartContainer } from "./ChartContainer";

describe("ChartContainer", () => {
  it("renders children", () => {
    render(<ChartContainer><span>Chart content</span></ChartContainer>);
    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<ChartContainer title="My Chart"><span>content</span></ChartContainer>);
    expect(screen.getByText("My Chart")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<ChartContainer subtitle="2025/26 data"><span>content</span></ChartContainer>);
    expect(screen.getByText("2025/26 data")).toBeInTheDocument();
  });

  it("renders source attribution when provided", () => {
    render(<ChartContainer source="NHS Digital"><span>content</span></ChartContainer>);
    expect(screen.getByText(/NHS Digital/)).toBeInTheDocument();
  });

  it("renders without title, subtitle, or source", () => {
    const { container } = render(<ChartContainer><span>minimal</span></ChartContainer>);
    expect(container).toBeInTheDocument();
    expect(screen.getByText("minimal")).toBeInTheDocument();
  });
});
