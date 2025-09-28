export type Movie = {
    id: number
    title: string;
    year: number;
};

export const movies: Movie[] = [
    { id: 1, title: "The Discovery", year: 2017 },
    { id: 2, title: "Silent Night", year: 2021 },
    { id: 3, title: "Tunnel", year: 1998 },
    { id: 4, title: "The Notebook", year: 2004 },
];
