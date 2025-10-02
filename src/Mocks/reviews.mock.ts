import type { Review } from "../domain/Review";

export const reviewsMock: Review[] = [
  {
    id: 1,
    userId: "john@gmail.com",
    movieId: 1,
    rating: 2,
    text: "This movie is meh",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    userId: "jane@gmail.com",
    movieId: 2,
    rating: 5,
    text: "Absolutely stunning!",
    createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    userId: "maria@gmail.com",
    movieId: 3,
    rating: 4,
    text: "This movie is great",
    createdAt: "2025-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    userId: "carlos@gmail.com",
    movieId: 4,
    rating: 5,
    text: "A masterpiece of cinema!",
    createdAt: "2025-01-04T00:00:00.000Z",
  },
  {
    id: 5,
    userId: "sofia.martinez@gmail.com",
    movieId: 2,
    rating: 3,
    text: "Good, but a bit too long for me.",
    createdAt: "2025-01-05T00:00:00.000Z",
  },
];
