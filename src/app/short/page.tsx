"use client";
import { useEffect, useState } from "react";
import { fetch, MOVIE_SLICE_NAME, useAppSelector } from "@/store";
import MovieTwoNameCard from "@/components/Cards/MovieTwoNameCard/page";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ITEMS_PER_PAGE = 12;

const ShortFilmPage = () => {
  const singleMovies = useAppSelector(
    (state) => state[MOVIE_SLICE_NAME].singleMovies
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleMovies.length === 0) {
      dispatch(fetch());
    }
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  // Tổng số trang
  const totalPages = Math.ceil(singleMovies.length / ITEMS_PER_PAGE);

  // Lấy danh sách phim theo trang hiện tại
  const currentMovies = singleMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="text-white text-2xl font-bold mb-4">Phim lẻ</div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {currentMovies.map((movie: any, index) => (
          <div key={index}>
            <Link href={`/details/${movie.slug}`}>
              <MovieTwoNameCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      {/* Điều hướng trang */}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>

        <span className="px-4 py-2 bg-gray-700 text-white rounded">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          className="px-4 py-2 mx-1 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default ShortFilmPage;
