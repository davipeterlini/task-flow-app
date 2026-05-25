import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";
import { LanguageProvider } from "../../src/contexts/LanguageContext";
import { ToastProvider } from "../../src/contexts/ToastContext";

// Mock Google OAuth completely - must be at top level
vi.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useGoogleLogin: () => () => {},
  googleLogout: () => {},
}));

// Mock AuthContext - use importOriginal to preserve the useAuth hook
vi.mock("../../src/contexts/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      user: { id: "1", name: "Test User", email: "test@example.com" },
      isLoading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    }),
  };
});

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <ToastProvider>{children}</ToastProvider>
    </LanguageProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
