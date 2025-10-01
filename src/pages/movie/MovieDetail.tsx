import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar";
import { useMovies } from "../../context/MoviesContext";
import { FaArrowLeft } from "react-icons/fa";
import RatingBadge from "../../components/RatingBadge";
import { i18n } from "../../i18n";
import { useUser } from "../../context/UserContext";
import Toast from "../../components/Toast";
import { useState } from "react";

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);
  const { state } = useMovies();
  const { user, addToWatchlist, addToWatched } = useUser();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const movie = state.movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="min-h-screen bg-primary-bg dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">
          {i18n.moviePage.movieNotFound}
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-primary-bg dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white items-center justify-center cursor-pointer"
          >
            <FaArrowLeft className="text-primary mr-2" />
            {i18n.moviePage.back}
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-md"
              />

              {user.isLoggedIn && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={async () => {
                      const result = addToWatched(movieId);
                      setToast({
                        message:
                          (await result) === "added"
                            ? i18n.moviePage.addedToWatched
                            : i18n.moviePage.alredyInWatched,
                        type: (await result) === "added" ? "success" : "error",
                      });
                    }}
                    className="flex-1 text-white bg-secundary dark:bg-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold hover:brightness-110 dark:hover:bg-gray-600 transition"
                  >
                    {i18n.moviePage.watched}
                  </button>
                  <button
                    onClick={async () => {
                      const result = addToWatchlist(movieId);
                      setToast({
                        message:
                          (await result) === "added"
                            ? i18n.moviePage.addedToWatchlist
                            : i18n.moviePage.alredyInWatchlist,
                        type: (await result) === "added" ? "success" : "error",
                      });
                    }}
                    className="flex-1 text-white bg-primary dark:bg-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold hover:brightness-110 dark:hover:bg-gray-600 transition"
                  >
                    {i18n.moviePage.watchlist}
                  </button>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {movie.title}
                  </h1>
                  <p className="text-lg text-gray-500">
                    {movie.year} •{" "}
                    {movie.genres.map((genre, index) => (
                      <span key={index}>
                        {genre}
                        {index < movie.genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>
                {/* Pasar dinamicamente el raiting */}
                <RatingBadge rating={3} />
              </div>

              <p className="font-semibold dark:text-white">
                {i18n.moviePage.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-10">
                {movie.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {i18n.moviePage.director}
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {movie.director ? movie.director : "Director name"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {i18n.moviePage.studio}
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {movie.studio ? movie.studio : "Studio name"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">
                  {i18n.moviePage.cast}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}
      </main>
    </>
  );
}

export default MovieDetail;
