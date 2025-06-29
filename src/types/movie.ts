export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  duration: string;
  description: string;
  poster: string;
  backdrop: string;
  director: string;
  cast: string[];
  featured?: boolean;
}

export interface Genre {
  id: string;
  name: string;
  movies: Movie[];
}