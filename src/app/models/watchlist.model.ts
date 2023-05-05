import { Movie } from "./movie.model";

export interface Watchlist {
    userId: string;
    movies: Movie[];
}