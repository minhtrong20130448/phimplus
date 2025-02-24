import { call, put, takeLatest, all } from "redux-saga/effects";
import movieSlice from "./movie.slice";
import { fetchMovieList, searchMovies } from "@/store/services/movie.service";
import data from "@/components/data/movies";

const {
  actions: { fetch, fetchSuccess, fetchFailure, search, searchSuccess },
} = movieSlice;

function* workFetch(): any {
  try {
    // Gọi API lấy dữ liệu của 3 trang phim cùng lúc
    const [page1, page2, page3] = yield all([
      call(fetchMovieList, 1),
      call(fetchMovieList, 2),
      call(fetchMovieList, 222),
    ]);

    // Gộp danh sách phim từ cả 3 trang
    const myData = data;
    const allMovies = [...myData, ...page1, ...page2, ...page3];
    // Lọc danh sách phim bộ, phim lẻ, phim mới
    const seriesMovies = allMovies.filter((movie) => movie.tmdb.type === "tv");
    const singleMovies = allMovies.filter(
      (movie) => movie.tmdb.type === "movie"
    );
    const newMovies = allMovies.slice(allMovies.length - 20, allMovies.length); // Giả sử 20 phim đầu là phim mới

    yield put(
      fetchSuccess({
        data: allMovies,
        movies: allMovies,
        seriesMovies,
        singleMovies,
        newMovies,
      })
    );
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

function* workSearch({ payload }: { payload: ISearchParams }): any {
  try {
    console.log("workSearch", payload);
    const searchResult = yield call(searchMovies, payload);
    yield put(searchSuccess({ searchMovies: searchResult.data }));
  } catch (error) {}
}

function* movieSaga() {
  yield takeLatest(fetch.type as any, workFetch);
  yield takeLatest(search.type as any, workSearch);
}

export default movieSaga;
