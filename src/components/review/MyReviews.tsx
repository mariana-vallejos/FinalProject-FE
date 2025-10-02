import ReviewComponent from "./ReviewComponent";
import { i18n } from "../../i18n";
import { useMovies } from "../../context/MoviesContext";
import { useUser } from "../../context/UserContext";

const MyReviews = () => {
  const { user } = useUser();
  const { getUserReviews } = useMovies();
  const reviews = getUserReviews(user.email);

  return (
    <section className="px-2 md:px-12">
      {reviews.length === 0 ? (
        <p className="text-gray-600">{i18n.profile.noContent}</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="md:flex justify-between gap-10 pb-8 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-md pb-2 dark:text-blue-200">{review.movie.title}</h3>
              <div className="ml-3 pl-2 border-l-2 border-gray-300">
                <ReviewComponent
                  readonly={false}
                  review={{
                    id: review.id,
                    movieId: review.movieId,
                    userId: review.userId,
                    rating: review.rating,
                    text: review.text,
                    tags: review.tags,
                    createdAt: review.createdAt,
                    user: { name: user.name, avatar: user.avatar },
                  }}
                  bgColor="#E4F7FF"
                />
              </div>
            </div>
            <img
              src={review.movie.posterUrl}
              alt=""
              className="hidden md:block md:w-1/3 max-h-60 object-cover rounded-xl shadow-md"
            />
          </div>
        ))
      )}
    </section>
  );
};

export default MyReviews;
