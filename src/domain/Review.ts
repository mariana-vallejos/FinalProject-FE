import type { User } from "./User";

export type Review = {
    id: number;
    movieId: number;
    user: User;
    rating: number;
    text?: string;
    tags?: string[];
    createdAt: string; // could be added updatedAt
}