type Movie = {
  id: string | number;
  title: string;
  titleVietnamese: string;
  year: string | number;
  image: string;
  description: string;
  category: string;
  duration: string;
  quality: string;
  rating: string;
  director: string;
  cast: string;
  trailer: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  // API
  imdb: {
    id: string;
  };
  modified: string;
  name: string;
  slug: string;
  orginal_name: string;
  poster_url: string;
  thumb_url: string;
  tmdb: {
    id: string;
    season: string;
    type: string;
    vote_average: string;
    vote_count: string;
  };
  _id: string;
};

interface MoiveState extends IGenericData<Movie[]> {
  play: {
    movie: any | null;
    episodes: any | null;
    episode_play: any | null;
  };
  seriesMovies: [];
  singleMovies: [];
  newMovies: [];
  search: {
    status: string | null;
    searchMovies: [];
  };
}
