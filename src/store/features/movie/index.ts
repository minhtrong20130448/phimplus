import movieSlice from "./movie.slice";

const {
  name: MOVIE_SLICE_NAME,
  actions: { fetch, fetchSuccess, fetchFailure, play, playEpisode, search },
} = movieSlice;

export {
  MOVIE_SLICE_NAME,
  fetch,
  fetchSuccess,
  fetchFailure,
  play,
  playEpisode,
  search,
};
