"use client";
import { useEffect, useState } from "react";
import { fetch, MOVIE_SLICE_NAME, search, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import MovieTwoNameCard from "@/components/Cards/MovieTwoNameCard/page";
const SearchPage = () => {
  const dispatch = useDispatch();
  // Data
  const dataSearch = useAppSelector((state) => state[MOVIE_SLICE_NAME].data);
  const newMovies = useAppSelector(
    (state) => state[MOVIE_SLICE_NAME].newMovies
  );
  // Search
  const [resultSearch, setResultSearch] = useState<typeof dataSearch>([]);
  const [searchValue, setSearchValue] = useState("");
  const recommendedMovies = newMovies?.slice(0, 8);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue && searchValue.trim() !== "") {
      setLoading(true);
      //dispatch(search({ keyword: searchValue }));#;
      // Tạo một danh sách phim mới chứa kết quả lọc
      const filteredMovies = dataSearch?.filter((movie) =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResultSearch(filteredMovies);
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (dataSearch && dataSearch.length === 0) {
      dispatch(fetch());
    }
  }, [dataSearch]);

  const handleOnChange = (value: any) => {
    setSearched(false);
    setSearchValue(value);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={searchValue ?? ""}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          id="default-search"
          className={`block w-full p-4 ps-10 text-sm text-white placeholder-white border border-zinc-600 rounded-lg bg-zinc-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder="Search Films..."
          required
        />
        <div className="flex absolute end-2.5 bottom-2.5 ">
          <button
            className={searchValue ? "block" : "hidden"}
            onClick={() => setSearchValue("")}
          >
            <svg
              className="w-6 h-6 text-gray-800 text-white opacity-50"
              aria-hidden="true"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
          <button
            onClick={handleSearch}
            className={`${
              !searchValue
                ? "bg-gray-400 cursor-pointer"
                : "bg-blue-700 hover:bg-blue-800"
            } ml-5 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2`}
            disabled={!searchValue}
          >
            Search
          </button>
        </div>
      </div>
      {searched && (
        <div className="text-white text-2xl font-bold mb-4 mt-4">
          Kết quả tìm kiếm:{" "}
          {resultSearch?.length === 0 ? "không tìm thấy phim phù hợp" : ""}
        </div>
      )}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-6">
        {loading && (
          <div className="w-full flex justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!loading &&
          resultSearch?.map((movie: any, index) => (
            <div key={index}>
              <Link href={`/details/${movie.slug}`}>
                <MovieTwoNameCard movie={movie} />
              </Link>
            </div>
          ))}
      </div>
      <div className="text-white text-2xl font-bold mb-4 mt-4">
        Phim đề xuất
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-6">
        {recommendedMovies?.length > 0 &&
          recommendedMovies.map((movie: any, index) => (
            <div key={index}>
              <Link href={`/details/${movie.slug}`}>
                <MovieTwoNameCard movie={movie} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
