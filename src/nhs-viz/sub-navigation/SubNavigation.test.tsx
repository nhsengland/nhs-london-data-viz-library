import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SubNavigation } from "./SubNavigation";

describe("SubNavigation", () => {
  it("renders nav element with aria-label", () => {
    render(
      <SubNavigation aria-label="Test nav">
        <SubNavigation.Item href="/a">Item A</SubNavigation.Item>
      </SubNavigation>
    );
    expect(screen.getByRole("navigation", { name: "Test nav" })).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(
      <SubNavigation aria-label="Nav">
        <SubNavigation.Item href="/one">One</SubNavigation.Item>
        <SubNavigation.Item href="/two">Two</SubNavigation.Item>
      </SubNavigation>
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("calls onClick handler when item is clicked", () => {
    const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(
      <SubNavigation aria-label="Nav">
        <SubNavigation.Item href="/test" onClick={onClick}>
          Click Me
        </SubNavigation.Item>
      </SubNavigation>
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders aria-current on active item", () => {
    render(
      <SubNavigation aria-label="Nav">
        <SubNavigation.Item href="/active" aria-current="page">
          Active
        </SubNavigation.Item>
      </SubNavigation>
    );
    expect(screen.getByText("Active").closest("a")).toHaveAttribute("aria-current", "page");
  });
});
