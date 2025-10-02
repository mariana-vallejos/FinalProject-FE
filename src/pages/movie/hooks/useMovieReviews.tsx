import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useMovies } from "../../../context/MoviesContext";
import type { Review, ReviewWithUser } from "../../../domain/Review";
import { dbPromise } from "../../../db/db";
import type { User } from "../../../domain/User";


export function useMovieReviews(movieId: number) {
  const { user } = useUser();
  const { state, addReview, editReview, deleteReview } = useMovies();
  const [reviewsWithUser, setReviewsWithUser] = useState<ReviewWithUser[]>([]);

  useEffect(() => {
    (async () => {
      const db = await dbPromise;
      const users: User[] = await db.getAll("users");

      const enriched = state.reviews
        .filter((r) => r.movieId === movieId)
        .map((r) => {
          const reviewUser = users.find((u) => u.email === r.userId);
          return {
            ...r,
            user: {
              name: reviewUser?.name ?? "Unknown",
              avatar: reviewUser?.avatar ?? "/default-avatar.png",
            },
          };
        });

      setReviewsWithUser(enriched);
    })();
  }, [state.reviews, movieId]);

  const myReview = useMemo(
    () => reviewsWithUser.find((r) => r.userId === user.email) ?? null,
    [reviewsWithUser, user.email]
  );

  const otherReviews = useMemo(
    () => reviewsWithUser.filter((r) => r.userId !== user.email),
    [reviewsWithUser, user.email]
  );

  const addMyReview = async (reviewData: Omit<Review, "id" | "createdAt" | "userId">) => {
    await addReview({ ...reviewData, userId: user.email });
  };

  return {
    myReview,
    otherReviews,
    allReviews: reviewsWithUser,
    addMyReview,
    editReview,
    deleteReview,
  };
}
