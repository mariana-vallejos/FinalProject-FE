import type { Movie } from "./Movie";
import type { Review } from "./Review";

export type State = {
  movies: Movie[];
  reviews: Review[];
  genres: string[];
}