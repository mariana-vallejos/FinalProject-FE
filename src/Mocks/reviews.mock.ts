import type { Review } from "../domain/Review";

export const reviews: Review[] = [
  {
    id: 1,
    movieId: 1,
    user: {
      name: "John Perez",
      email: "john@gmail.com",
      role: "user",
      avatar: "https://i.pravatar.cc/40?img=5",
      isLoggedIn: true,
      password: "2346"
    },
    rating: 3.5,
    text: "Absolutely loved this movie! The plot was captivating, and the visuals were stunning. The actors delivered outstanding performances, making it a truly immersive experience. Highly recommend!",
    tags: ["netflix", "primevideo", "cinema"],
    createdAt: "2025-03-21"
  },
];
