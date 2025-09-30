import type { Movie } from "../../domain/Movie";

export type FieldType = 
  | "title"
  | "year"
  | "description"
  | "posterUrl"
  | "genres"
  | "cast"
  | "tags";

export type Step1Fields = { field: FieldType; type: string; placeholder: string };
export type Step2Fields = { field: Extract<FieldType, "genres" | "cast" | "tags">; type: "list"; placeholder: string };



export type MovieDraft = Omit<Movie, "id" | "createdAt">;

export type MovieErrorsType = Partial<Record<FieldType, string>>;
export type MovieTouchedType = Partial<Record<FieldType, boolean>>;

export const fields: Step1Fields[] = [
    { field: "title", type: "text", placeholder: "e.g., Interstellar" },
    { field: "year", type: "number", placeholder: "2014" },
    { field: "posterUrl", type: "url", placeholder: "https://example.com/poster.jpg" },
    { field: "description", type: "textarea", placeholder: "Brief synopsis..." },
];

export const secondStepFields: Step2Fields[] = [
  { field: "cast",   type: "list", placeholder: "e.g., Leonardo DiCaprio, Anne Hathaway" },
  { field: "genres", type: "list", placeholder: "e.g., Sci-Fi, Drama" },
  { field: "tags",   type: "list", placeholder: "e.g., space, time, Nolan" },
];

export const step1Keys = ["title","year","posterUrl","description"] as const;
export const step2Keys = ["cast","genres","tags"] as const;