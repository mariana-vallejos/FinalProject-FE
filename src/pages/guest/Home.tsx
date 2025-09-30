import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import Toast from "../../components/Toast";
import { i18n } from "../../i18n";
import type { Movie } from "../../domain/Movie";
import { useUser } from "../../context/UserContext";
import { useMovies } from "../../context/MoviesContext";

function Home() {

  const {state} = useMovies();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary-bg dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
            Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {state.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
