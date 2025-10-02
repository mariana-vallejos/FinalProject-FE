import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
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
});
