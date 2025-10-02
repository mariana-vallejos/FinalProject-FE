import type { Movie } from "./Movie";
import type { User } from "./User";

export type Review = {
    id: number;
    movieId: number;
    userId: string;
    rating: number;
    text?: string;
    tags?: string[];
    createdAt: string;
}

export interface ReviewWithUser extends Review {
  user: Pick<User, "name" | "avatar">;
}

export interface ReviewWithMovie extends Review {
  movie: Pick<Movie, "id" | "title" | "posterUrl">;
}
