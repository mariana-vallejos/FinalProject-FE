import { createContext, useContext, useEffect, useReducer } from "react";
import { dbPromise } from "../db/db";
import { v4 as uuid } from "uuid";

interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  description: string;
  posterUrl?: string;
  cast: string[];
  tags?: string[];
  createdAt: string;
}
interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  text?: string;
  tags?: string[];
  createdAt: string;
}

interface State {
  movies: Movie[];
  reviews: Review[];
}
type Action =
  | { type: "SET_DATA"; movies: Movie[]; reviews: Review[] }
  | { type: "ADD_MOVIE"; movie: Movie }
  | { type: "EDIT_MOVIE"; movie: Movie }
  | { type: "DELETE_MOVIE"; id: string }
  | { type: "ADD_REVIEW"; review: Review }
  | { type: "EDIT_REVIEW"; review: Review }
  | { type: "DELETE_REVIEW"; id: string };

const MoviesContext = createContext<{
  state: State;
  addMovie: (m: Omit<Movie, "id" | "createdAt">) => Promise<void>;
  editMovie: (m: Movie) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
  addReview: (r: Omit<Review, "id" | "createdAt">) => Promise<void>;
  editReview: (r: Review) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DATA":
      return { movies: action.movies, reviews: action.reviews };
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.movie] };
    case "EDIT_MOVIE":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.id === action.movie.id ? action.movie : m
        ),
      };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((m) => m.id !== action.id),
      };
    case "ADD_REVIEW":
      return { ...state, reviews: [...state.reviews, action.review] };
    case "EDIT_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((r) =>
          r.id === action.review.id ? action.review : r
        ),
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((r) => r.id !== action.id),
      };
    default:
      return state;
  }
}

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { movies: [], reviews: [] });

  // cargar desde indexedDB
  useEffect(() => {
    (async () => {
      const db = await dbPromise;
      const movies = await db.getAll("movies");
      const reviews = await db.getAll("reviews");
      dispatch({ type: "SET_DATA", movies, reviews });
    })();
  }, []);

  // funciones
  const addMovie = async (m: Omit<Movie, "id" | "createdAt">) => {
    const db = await dbPromise;
    const newMovie: Movie = {
      ...m,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    await db.put("movies", newMovie);
    dispatch({ type: "ADD_MOVIE", movie: newMovie });
  };

  const editMovie = async (movie: Movie) => {
    const db = await dbPromise;
    await db.put("movies", movie);
    dispatch({ type: "EDIT_MOVIE", movie });
  };

  const deleteMovie = async (id: string) => {
    const db = await dbPromise;
    await db.delete("movies", id);
    dispatch({ type: "DELETE_MOVIE", id });
  };

  const addReview = async (r: Omit<Review, "id" | "createdAt">) => {
    const db = await dbPromise;
    const newReview: Review = {
      ...r,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    await db.put("reviews", newReview);
    dispatch({ type: "ADD_REVIEW", review: newReview });
  };

  const editReview = async (review: Review) => {
    const db = await dbPromise;
    await db.put("reviews", review);
    dispatch({ type: "EDIT_REVIEW", review });
  };

  const deleteReview = async (id: string) => {
    const db = await dbPromise;
    await db.delete("reviews", id);
    dispatch({ type: "DELETE_REVIEW", id });
  };

  return (
    <MoviesContext.Provider
      value={{
        state,
        addMovie,
        editMovie,
        deleteMovie,
        addReview,
        editReview,
        deleteReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be inside MoviesProvider");
  return ctx;
}
