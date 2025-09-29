export type Movie = {
    id: number;
    title: string;
    year: number;
    genres: string[];
    description: string;
    posterUrl?: string;
    cast: string[];
    tags?: string[];
    createdAt: string;
}

export type NewMovie = Partial<Movie>;