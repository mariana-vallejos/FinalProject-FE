import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

import { useUser } from "../../context/UserContext";

describe("ProtectedRoute", () => {
  it("should show loading state when loading is true", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Child</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should redirect to /login if user is not logged in", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { isLoggedIn: false, role: "guest" },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should redirect to / if user role is not allowed", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { isLoggedIn: true, role: "user" },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProtectedRoute roles={["admin"]}>
          <div>Admin Panel</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe("/");
  });

  it("should render children when user is logged in and role is allowed", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { isLoggedIn: true, role: "admin" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute roles={["admin"]}>
          <div>Secret Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Secret Content")).toBeInTheDocument();
  });

  it("should render children when no roles restriction and user is logged in", () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { isLoggedIn: true, role: "user" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Open Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Open Content")).toBeInTheDocument();
  });
});
