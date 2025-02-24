import { combineReducers } from "@reduxjs/toolkit";

import movieSlice from "../features/movie/movie.slice";

const rootReducer = combineReducers({
  [movieSlice.name]: movieSlice.reducer,
});

export default rootReducer;
