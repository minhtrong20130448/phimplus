interface MovieList {
  movies: Movie[];
}

interface HorizontalMovieListProps {
  movies?: Movie[] | null | undefined;
  title?: string;
  numberMovie?: number;
}

interface MovieCardProps {
  movie: any;
}
