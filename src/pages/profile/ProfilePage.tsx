import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useMovies } from "../../context/MoviesContext";
import { i18n } from "../../i18n";
import MovieCard from "../../components/MovieCard";

function ProfilePage() {
  const { user } = useUser();
  const { state } = useMovies();
  const [activeTab, setActiveTab] = useState<
    "reviews" | "watchlist" | "watched"
  >("reviews");

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || "User"
  )}&background=random&rounded=true&size=128`;

  const watchedMovies = state.movies.filter((m) =>
    user.watched?.includes(m.id)
  );

  const watchlistMovies = state.movies.filter((m) =>
    user.watchlist?.includes(m.id)
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-6">
        <img
          src={user.avatar || avatarUrl}
          alt="profile"
          className="w-24 h-24 rounded-full border border-gray-300"
        />

        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          <button className="btn-primary">{i18n.profile.edit}</button>
        </div>
      </div>

      <div className="mt-8 border-b flex gap-6 text-sm">
        <button
          className={`pb-2 ${
            activeTab === "reviews"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-primary"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          {i18n.profile.reviews}
        </button>
        <button
          className={`pb-2 ${
            activeTab === "watchlist"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-primary"
          }`}
          onClick={() => setActiveTab("watchlist")}
        >
          {i18n.navbar.WatchList}
        </button>
        <button
          className={`pb-2 ${
            activeTab === "watched"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-primary"
          }`}
          onClick={() => setActiveTab("watched")}
        >
          {i18n.profile.watched}
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "reviews" && (
          <p className="text-gray-600">{i18n.profile.noContent}</p>
        )}

        {activeTab === "watchlist" && (
          <>
            {watchlistMovies.length === 0 ? (
              <p className="text-gray-600">{i18n.profile.noContent}</p>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {watchlistMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "watched" && (
          <>
            {watchedMovies.length === 0 ? (
              <p className="text-gray-600">{i18n.profile.noContent}</p>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {watchedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
