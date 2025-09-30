import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Stars from "../../components/Stars";
import { Table } from "../../components/Table";
import { dbPromise } from "../../db/db";
import { useMovies } from "../../context/MoviesContext";
import type { User } from "../../domain/User";

function ReviewsPage() {
  const { state } = useMovies();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const db = await dbPromise;
      const allUsers = await db.getAll("users");
      setUsers(allUsers);
    })();
  }, []);

  const data = state.reviews.map((review) => {
    const movie = state.movies.find((m) => m.id === review.movieId);
    const user = users.find((u) => u.email === review.userId);

    return {
      user: user?.name ?? "Unknown",
      movie: movie?.title ?? "Unknown",
      rating: review.rating,
      text: review.text,
    };
  });


  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-primary-bg px-6 py-10">
            <Table
                data={data}
                columns={[
                    { key: "user", header: "User" },
                    { key: "movie", header: "Movie" },
                    {
                        key: "rating",
                        header: "Rating",
                        render: (row) => 
                            <div className="flex justify-center">
                                <Stars rating={row.rating}/>
                            </div>
                    },
                    { key: "text", header: "Message" }
                ]}  
            />
        </div>  
    </div>
  );
}

export default ReviewsPage