import type { Movie } from "../domain/Movie";

export function computeGenres(movies: Movie[]): string[]{
    const set = new Set<string>();
    for(const movie of movies){
        for(const genre of movie.genres){
            const cleanedGenre = (genre ?? "").trim();
            set.add(cleanedGenre);
        }
    }
    return Array.from(set);
}