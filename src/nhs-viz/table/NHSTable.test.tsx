import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NHSTable } from "./NHSTable";

const mockColumns = [
  { key: "name", header: "Name" },
  { key: "value", header: "Value" },
];

const mockData = [
  { name: "London", value: 420 },
  { name: "Manchester", value: 380 },
  { name: "Birmingham", value: 310 },
];

describe("NHSTable", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <NHSTable data={mockData} columns={mockColumns} />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders column headers in table head", () => {
    const { container } = render(<NHSTable data={mockData} columns={mockColumns} />);
    const headers = container.querySelectorAll("th");
    expect(headers.length).toBeGreaterThanOrEqual(2);
  });

  it("renders data rows", () => {
    render(<NHSTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("420")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<NHSTable data={mockData} columns={mockColumns} title="Regional Data" />);
    expect(screen.getByText("Regional Data")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    const { container } = render(
      <NHSTable data={mockData} columns={mockColumns} />
    );
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(3);
  });

  it("renders with empty data without crashing", () => {
    const { container } = render(
      <NHSTable data={[]} columns={mockColumns} />
    );
    expect(container).toBeInTheDocument();
  });
});
