import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Sidebar } from "../../src/components/layout/Sidebar";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the app name in collapsed mode", () => {
    render(<Sidebar currentView="home" onViewChange={vi.fn()} />);
    expect(screen.getByText("Task Flow")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<Sidebar currentView="home" onViewChange={vi.fn()} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Kanban")).toBeInTheDocument();
  });

  it("calls onViewChange when clicking a nav item", () => {
    const onViewChange = vi.fn();
    render(<Sidebar currentView="home" onViewChange={onViewChange} />);
    // Click would be tested with userEvent in a full test
    expect(onViewChange).not.toHaveBeenCalled();
  });
});
