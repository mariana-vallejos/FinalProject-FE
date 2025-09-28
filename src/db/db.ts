import { openDB } from "idb";
import type { DBSchema } from "idb";

export interface CineLogDB extends DBSchema {
  movies: {
    key: string;
    value: {
      id: string;
      title: string;
      year: number;
      genres: string[];
      description: string;
      posterUrl?: string;
      cast: string[];
      tags?: string[];
      createdAt: string;
    };
  };
  reviews: {
    key: string;
    value: {
      id: string;
      movieId: string;
      userId: string;
      rating: number;
      text?: string;
      tags?: string[];
      createdAt: string;
    };
  };
  users: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      isAdmin?: boolean;
    };
  };
  session: {
    key: string;
    value: string;
  };
}

export const dbPromise = openDB<CineLogDB>("CineLogDB", 1, {
  upgrade(db) {
    db.createObjectStore("movies", { keyPath: "id" });
    db.createObjectStore("reviews", { keyPath: "id" });
    db.createObjectStore("users", { keyPath: "id" });
    db.createObjectStore("session");
  },
});
