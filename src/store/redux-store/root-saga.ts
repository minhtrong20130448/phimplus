import { all, fork } from "redux-saga/effects";

import movieSaga from "../features/movie/movie.saga";

export default function* rootSaga() {
  yield all([fork(movieSaga)]);
}
