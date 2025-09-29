import { useMemo } from "react";
import type { NewMovie, Movie } from "../domain/Movie";
import { IndexedDbMovieRepository } from "../infrastructure/IndexDbMovieRepository";
import { SaveMovie } from "../application/SaveMovie";

export function useSaveMovie() {
    const saveMovie = useMemo(() => {
        const repo = new IndexedDbMovieRepository();
        return new SaveMovie(repo);
    }, []);

    const save = (input: NewMovie): Promise<Movie> => saveMovie.execute(input);
    return { save };
}