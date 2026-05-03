import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NHSFilters } from "./NHSFilters";

describe("NHSFilters", () => {
  it("renders title when provided", () => {
    render(<NHSFilters title="Filter data" fields={[]} />);
    expect(screen.getByText("Filter data")).toBeInTheDocument();
  });

  it("renders a select field", () => {
    render(
      <NHSFilters
        fields={[{
          id: "region",
          label: "Region",
          type: "select",
          options: [{ label: "London", value: "london" }, { label: "South East", value: "se" }],
        }]}
      />
    );
    expect(screen.getByLabelText("Region")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("renders a search field", () => {
    render(
      <NHSFilters
        fields={[{ id: "search", label: "Search", type: "search", placeholder: "Type here..." }]}
      />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("renders radio buttons", () => {
    render(
      <NHSFilters
        fields={[{
          id: "period",
          label: "Period",
          type: "radio",
          options: [{ label: "Q1", value: "q1" }, { label: "Q2", value: "q2" }],
          value: "q1",
        }]}
      />
    );
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });

  it("calls onChange when select value changes", () => {
    const onChange = vi.fn();
    render(
      <NHSFilters
        fields={[{
          id: "region",
          label: "Region",
          type: "select",
          options: [{ label: "London", value: "london" }],
          value: "",
        }]}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Region"), { target: { value: "london" } });
    expect(onChange).toHaveBeenCalledWith("region", "london");
  });

  it("renders Apply button when onApply provided", () => {
    const onApply = vi.fn();
    render(<NHSFilters fields={[]} onApply={onApply} showActions={true} />);
    fireEvent.click(screen.getByText("Apply filters"));
    expect(onApply).toHaveBeenCalledOnce();
  });

  it("renders Clear button when onClear provided", () => {
    const onClear = vi.fn();
    render(<NHSFilters fields={[]} onClear={onClear} showActions={true} />);
    fireEvent.click(screen.getByText("Clear filters"));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("collapses when collapsible and toggle clicked", () => {
    render(
      <NHSFilters
        title="Filters"
        fields={[{ id: "x", label: "X Field", type: "search" }]}
        collapsible
      />
    );
    expect(screen.getByLabelText("X Field")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Hide filters ▲"));
    expect(screen.queryByLabelText("X Field")).not.toBeInTheDocument();
  });
});
