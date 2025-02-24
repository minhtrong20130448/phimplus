import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { search } from ".";

const initialState: MoiveState = {
  status: "idle",
  data: null,
  play: {
    movie: null,
    episodes: null,
    episode_play: null,
  },
  seriesMovies: [],
  singleMovies: [],
  newMovies: [],
  search: {
    status: "idle",
    searchMovies: [],
  },
};

const moiveSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetch(state: any) {
      state.status = "loading";
    },
    fetchSuccess(state: any, action: PayloadAction<any>) {
      state.status = "success";
      state.data = action.payload.data;
      state.seriesMovies = action.payload.seriesMovies;
      state.singleMovies = action.payload.singleMovies;
      state.newMovies = action.payload.newMovies;
    },
    fetchFailure(state: any, action: PayloadAction<any>) {
      state.status = "failed";
      state.data = action.payload;
    },
    play(state: any, action: PayloadAction<any>) {
      state.play.movie = action.payload.movie;
      state.play.episodes = action.payload.episodes;
      state.play.episode_play = action.payload.episode_play;
    },
    playEpisode(state: any, action: PayloadAction<any>) {
      state.play.episode_play = action.payload.episode_play;
    },
    search(state: any, action: PayloadAction<any>) {
      state.search.status = "loading";
    },
    searchSuccess(state: any, action: PayloadAction<any>) {
      state.search.status = "success";
      state.search.searchMovies = action.payload.searchMovies;
    },
    searchFailure(state: any, action: PayloadAction<any>) {
      state.search.status = "failed";
      state.search.searchMovies = action.payload;
    },
  },
});

export default moiveSlice;
