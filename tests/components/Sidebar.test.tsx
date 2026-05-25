import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../utils/test-utils";
import { Sidebar } from "../../src/components/layout/Sidebar";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation items", () => {
    render(<Sidebar currentView="home" onViewChange={vi.fn()} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Kanban")).toBeInTheDocument();
    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByText("Calendario")).toBeInTheDocument();
    expect(screen.getByText("Hoje")).toBeInTheDocument();
    expect(screen.getByText("Configuracoes")).toBeInTheDocument();
  });

  it("calls onViewChange when clicking a nav item", () => {
    const onViewChange = vi.fn();
    render(<Sidebar currentView="home" onViewChange={onViewChange} />);

    const kanbanButton = screen.getByText("Kanban").closest("button");
    if (kanbanButton) {
      fireEvent.click(kanbanButton);
      expect(onViewChange).toHaveBeenCalledWith("kanban");
    }
  });
});
