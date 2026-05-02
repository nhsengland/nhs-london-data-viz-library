import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NHSErrorCard } from "./NHSErrorCard";

describe("NHSErrorCard", () => {
  it("renders default title and message", () => {
    render(<NHSErrorCard />);
    expect(screen.getByText("Unable to display visualisation")).toBeInTheDocument();
    expect(screen.getByText(/There was a problem loading this data/)).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(<NHSErrorCard title="Custom Error" message="Something went wrong" />);
    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders component name when provided", () => {
    render(<NHSErrorCard componentName="NHSBarChart" />);
    expect(screen.getByText("NHSBarChart")).toBeInTheDocument();
  });

  it("renders error details in collapsible section", () => {
    render(<NHSErrorCard details="Stack trace here" />);
    expect(screen.getByText("Error details")).toBeInTheDocument();
    expect(screen.getByText("Stack trace here")).toBeInTheDocument();
  });

  it("calls onRetry when retry button clicked", () => {
    const onRetry = vi.fn();
    render(<NHSErrorCard onRetry={onRetry} />);
    fireEvent.click(screen.getByText("Retry"));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("does not render retry button when onRetry not provided", () => {
    render(<NHSErrorCard />);
    expect(screen.queryByText("Retry")).not.toBeInTheDocument();
  });
});
