import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSBarChart } from "./NHSBarChart";

const mockData = [
  { region: "London", value: 420 },
  { region: "South East", value: 380 },
  { region: "East", value: 310 },
];

describe("NHSBarChart", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <NHSBarChart data={mockData} xKey="region" yKeys={["value"]} />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <NHSBarChart data={mockData} xKey="region" yKeys={["value"]} title="Admissions by Region" />
    );
    expect(screen.getByText("Admissions by Region")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <NHSBarChart data={mockData} xKey="region" yKeys={["value"]} subtitle="Q4 2025/26" />
    );
    expect(screen.getByText("Q4 2025/26")).toBeInTheDocument();
  });

  it("renders source attribution when provided", () => {
    render(
      <NHSBarChart data={mockData} xKey="region" yKeys={["value"]} source="NHS Digital" />
    );
    expect(screen.getByText(/NHS Digital/)).toBeInTheDocument();
  });

  it("renders with empty data without crashing", () => {
    const { container } = render(
      <NHSBarChart data={[]} xKey="region" yKeys={["value"]} />
    );
    expect(container).toBeInTheDocument();
  });
});
