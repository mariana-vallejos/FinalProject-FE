import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import { useMovies } from "../../context/MoviesContext";
import ReviewComponent from "../../components/ReviewComponent";
import { reviews } from "../../Mocks/reviews.mock";

function Home() {

  const {state} = useMovies();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary-bg dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
            <section className="bg-white dark:bg-gray-600 w-[800px] mx-12">
              <ReviewComponent review={reviews[0]} readonly={false}/>
            </section>
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
