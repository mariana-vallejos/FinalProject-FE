import { openDB } from "idb";
import type { DBSchema } from "idb";
import type { Movie } from "../domain/Movie";
import type { Review } from "../domain/Review";
import type { User } from "../domain/User";
import { mockAdmin, mockUser } from "../Mocks/user.mock";

export type PersistableMovie = Omit<Movie, "id"> & { id?: number };
export type PersistableReview = Omit<Review, "id"> & { id?: number };

export interface CineLogDB extends DBSchema {
  movies: { key: number; value: PersistableMovie };
  reviews: { key: number; value: PersistableReview };
  users: { key: string; value: User };
  session: { key: string; value: string };
}

export const dbPromise = openDB<CineLogDB>("CineLogDB", 1, {
  upgrade(db) {
    db.createObjectStore("movies", { keyPath: "id", autoIncrement: true });
    db.createObjectStore("reviews", { keyPath: "id", autoIncrement: true });
    const users = db.createObjectStore("users", { keyPath: "email" });
    db.createObjectStore("session");

    users.put({
      email: mockAdmin.email,
      name: mockAdmin.name,
      password: mockAdmin.password,
      role: mockAdmin.role,
      isLoggedIn: false,
      watchlist: [],
      watched: [],
    });
    users.put({
      email: mockUser.email,
      name: mockUser.name,
      password: mockUser.password,
      role: mockUser.role,
      isLoggedIn: false,
      watchlist: [],
      watched: [],
    });
  },
});
