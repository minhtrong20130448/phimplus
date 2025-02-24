"use client";
import { use, useEffect, useState } from "react";
import { fetch, MOVIE_SLICE_NAME, useAppSelector } from "@/store";
import MovieTwoNameCard from "@/components/Cards/MovieTwoNameCard/page";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ITEMS_PER_PAGE = 12;

const CategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [category, setCategory] = useState(decodeURIComponent(id));
  const data = useAppSelector((state) => state[MOVIE_SLICE_NAME].data);
  const [categoryData, setCategoryData] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetch());
    }
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((movie: any) =>
        // filter theo movie.categories nếu có chứa category
        {
          return movie.categories?.some(
            (cat: any) => cat.toLowerCase() === category.toLowerCase()
          );
        }
      );
      setCategoryData(filteredData);
    }
  }, [data, category]);

  if (!data) return <div>Không có dữ liệu</div>;

  const [currentPage, setCurrentPage] = useState(1);

  // Tổng số trang
  const totalPages = Math.ceil(categoryData?.length / ITEMS_PER_PAGE);

  // Lấy danh sách phim theo trang hiện tại
  const currentMovies = categoryData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
        <span>Thể loại</span>
        <svg
          className="w-[20px] h-[20px] text-white dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
          />
        </svg>
        <div>
          <select
            defaultValue={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="px-2 py-1 text-white rounded border border-white flex items-center gap-1 bg-gray-800"
          >
            <option value="Hành động">Hành động</option>
            <option value="Hài hước">Hài hước</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Tình cảm">Tình cảm</option>
            <option value="Viễn tưởng">Viễn tưởng</option>
            <option value="Chính kịch">Chính kịch</option>
            <option value="Phiêu lưu">Phiêu lưu</option>
            <option value="Khoa học">Khoa học</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {currentMovies.map((movie: any, index: any) => (
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

export default CategoryPage;
