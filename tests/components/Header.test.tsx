import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../utils/test-utils";
import { Header } from "../../src/components/layout/Header";

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the app name", () => {
    render(<Header />);
    expect(screen.getByText("Task Flow App")).toBeInTheDocument();
  });

  it("has a logout button", () => {
    render(<Header />);
    expect(screen.getByText(/sair/i)).toBeInTheDocument();
  });
});
