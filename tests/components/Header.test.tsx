import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Header } from "../../src/components/layout/Header";

vi.mock("../../src/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "1", name: "Test User", email: "test@example.com" },
    signOut: vi.fn(),
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the app name", () => {
    render(<Header />);
    expect(screen.getByText("Task Flow App")).toBeInTheDocument();
  });

  it("shows user email when authenticated", () => {
    render(<Header />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("has a logout button", () => {
    render(<Header />);
    expect(screen.getByText(/sair/i)).toBeInTheDocument();
  });
});
