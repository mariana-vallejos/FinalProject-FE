import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import Toast from "../../components/Toast";
import { i18n } from "../../i18n";
import type { Movie } from "../../domain/Movie";
import { useUser } from "../../context/UserContext";
import { useMovies } from "../../context/MoviesContext";
import { useMemo, useState } from "react";
import SearchBar from "../../components/SearchBar";

function Home() {
  const { state } = useMovies();
  const [query, setQuery] = useState("");

  function filterMovies(movies: Movie[], query: string): Movie[] {
    const cleanedQuery = query.trim().toLowerCase();
    if (!cleanedQuery) return movies;
    return movies.filter((movie) => movie.title.toLowerCase().includes(cleanedQuery));
  }

  const filtered = useMemo(
    () => filterMovies(state.movies, query),
    [state.movies, query]
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary-bg dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Movies
          </h1>

          <div className="mt-3 sm:mt-4 max-w-md">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeHolder="Search by title…"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-600 p-8 text-center text-neutral-500 dark:text-neutral-400">
              No results{query ? ` for “${query}”` : ""}.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
