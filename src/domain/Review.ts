export type Review = {
    id: number;
    movieId: number;
    userId: string;
    rating: number;
    text?: string;
    tags?: string[];
    createdAt: string;
}