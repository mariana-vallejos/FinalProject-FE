import { dbPromise } from "../db/db";
import type { ReviewWithUser } from "../domain/Review";

export async function getReviewsWithUsers(movieId: number): Promise<ReviewWithUser[]> {
  const db = await dbPromise;

  const allReviews = await db.getAll("reviews");
  const reviewsOfMovie = allReviews.filter(r => r.movieId === movieId);

  const allUsers = await db.getAll("users");

  const reviewsWithUser: ReviewWithUser[] = reviewsOfMovie.map((review) => {
    const user = allUsers.find(u => u.email === review.userId);

    return {
      id: review.id!,
      movieId: review.movieId,
      userId: review.userId,
      rating: review.rating,
      text: review.text,
      tags: review.tags,
      createdAt: review.createdAt,
      user: {
        name: user?.name || "Usuario desconocido",
        avatar: user?.avatar ?? "/default-avatar.png",
      },
    };
  });

  return reviewsWithUser;
}
