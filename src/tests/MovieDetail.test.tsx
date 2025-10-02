import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import MovieDetail from "../pages/movie/MovieDetail";

// Mock de idb
vi.mock("idb", () => ({
  openDB: vi.fn().mockResolvedValue({
    getAll: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }),
}));

// Mock de react-router
vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: "1" }),
}));

// Mock de MoviesContext
vi.mock("../context/MoviesContext", () => {
  return {
    useMovies: () => ({
      state: {
        movies: [
          {
            id: 1,
            title: "Test Movie",
            year: 2024,
            genres: ["Drama"],
            description: "Some description",
            posterUrl: "test.jpg",
            director: "Test Director",
            studio: "Test Studio",
            cast: ["Actor A", "Actor B"],
          },
        ],
        reviews: [
          { id: 1, movieId: 1, userId: "u1", rating: 4 },
          { id: 2, movieId: 1, userId: "u2", rating: 2 },
          { id: 3, movieId: 1, userId: "u3", rating: 5 },
        ],
      },
    }),
    MoviesProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock de UserContext
vi.mock("../context/UserContext", () => {
  return {
    useUser: () => ({
      user: {
        id: "u1",
        isLoggedIn: true,
        watchlist: [],
        watched: [],
      },
      addToWatchlist: vi.fn().mockResolvedValue("added"),
      addToWatched: vi.fn().mockResolvedValue("added"),
    }),
    UserProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("MovieDetail - Rating promedio", () => {
  test("muestra el promedio correcto en RatingBadge", () => {
    const expectedAverage = (4 + 2 + 5) / 3; // 3.67

    render(<MovieDetail />);

    expect(screen.getByText(expectedAverage.toFixed(1))).toBeInTheDocument();
  });
});
