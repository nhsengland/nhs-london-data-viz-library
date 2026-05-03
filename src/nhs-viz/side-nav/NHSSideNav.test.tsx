import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NHSSideNav } from "./NHSSideNav";

const mockItems = [
  { path: "/overview", label: "Overview", group: "Home" },
  { path: "/charts", label: "Charts", group: "Visualisations" },
  { path: "/tables", label: "Tables", group: "Visualisations" },
];

describe("NHSSideNav", () => {
  it("renders navigation items when open", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Charts")).toBeInTheDocument();
    expect(screen.getByText("Tables")).toBeInTheDocument();
  });

  it("renders group headings", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Visualisations")).toBeInTheDocument();
  });

  it("highlights active item with aria-current", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} activePath="/charts" />);
    expect(screen.getByText("Charts").closest("a")).toHaveAttribute("aria-current", "page");
  });

  it("does not highlight inactive items", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} activePath="/charts" />);
    expect(screen.getByText("Overview").closest("a")).not.toHaveAttribute("aria-current");
  });

  it("calls onNavigate when item clicked", () => {
    const onNavigate = vi.fn();
    render(<NHSSideNav items={mockItems} isOpen={true} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText("Charts"));
    expect(onNavigate).toHaveBeenCalledWith("/charts");
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<NHSSideNav items={mockItems} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close navigation"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders custom title", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} title="Menu" />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders nav with aria-label", () => {
    render(<NHSSideNav items={mockItems} isOpen={true} title="Main menu" />);
    expect(screen.getByRole("navigation", { name: "Main menu" })).toBeInTheDocument();
  });
});
