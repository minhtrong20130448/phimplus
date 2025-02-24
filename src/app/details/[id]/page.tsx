"use client";

import MovieSlider from "../../../components/Slider/MovieSlider";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { fetchMovieDetail } from "@/store/services/movie.service";
import { useDispatch } from "react-redux";
import { fetch, MOVIE_SLICE_NAME, play, useAppSelector } from "@/store";

const MovieDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state[MOVIE_SLICE_NAME].data);
  const [movie, setMovie] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any>(null);
  const [relatedMovies, setRelatedMovies] = useState<any>(null);
  const { id } = use(params);
  useEffect(() => {
    fetchMovieDetail({ slug: id }).then((data) => {
      setMovie(data?.movie);
      setEpisodes(data?.episodes);
    });
  }, [id]);

  useEffect(() => {
    dispatch(
      play({
        movie,
        episodes,
        episode_play: episodes?.[0].server_data?.[0]?.link_embed,
      })
    );
    if (data?.length === 0) {
      dispatch(fetch());
    }
    if (data && movie && data.length > 0) {
      const timeout = setTimeout(() => {
        const related = data
          .filter(
            (item: any) =>
              item?.name !== movie.name && // Loại bỏ movie hiện tại
              item?.categories?.some((category: any) => {
                return movie.category.some(
                  (movieCategory: any) =>
                    movieCategory.name.toLowerCase() === category.toLowerCase()
                );
              }) // Kiểm tra trùng categories
          )
          .slice(0, 5);
        setRelatedMovies(related);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [movie, episodes]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  // Trailer
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(movie?.trailer_url);

  return (
    <div className="relative mb-6 flex flex-col gap-3 flex-row items-center justify-between">
      {/* background image */}
      <div
        className="w-full overflow-hidden bg-cover bg-center absolute -top-2 left-0 z-0 opacity-20"
        style={{
          paddingBottom: "420px",
          backgroundImage: `url('${movie.poster_url}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
          backgroundPosition: "center +15%",
        }}
      ></div>
      <div className="flex lg:w-[80%] w-[95%] flex-row gap-5.5 z-10 items-start justify-between gap-5 max-w-screen-xl mx-auto mt-32">
        <div className="flex w-1/4 flex-col gap-5.5">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="w-full max-w-[320px]">
              <img src={movie.thumb_url} alt="movie image" className="w-full" />
              {episodes?.[0].server_data?.[0]?.link_embed ? (
                <Link href={`/plays/${movie.slug}`}>
                  <button className="block w-full h-[50px] mt-6 px-3 rounded-md text-white transition bg-blue-600 font-bold">
                    Xem Phim
                  </button>
                </Link>
              ) : (
                <button className="block w-full h-[50px] mt-6 px-3 rounded-md text-white transition bg-gray-400 font-bold">
                  Đang cập nhật
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-3/4 flex-col gap-5.5">
          <div className="font-bold text-[40px]">{movie.name}</div>
          <div className="font-light text-[25px] text-gray-400 mb-6">
            {movie.origin_name} ({movie.year})
          </div>

          <button className="flex items-center text-blue-400 hover:text-white gap-2.5 px-2 py-1 rounded-md w-[120px] border border-blue-400 mb-8 hover:bg-blue-400 hover:border-blue-400 hover:text-white">
            <span>
              <svg
                className="w-4 h-4 text-white"
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
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </span>
            <span className="font-semibold">Yêu thích</span>
          </button>

          <div className="flex flex-row gap-5 justify-between">
            <div className="w-[50%]">
              <div className="flex text-sm mb-4">
                <div className="w-[90px] text-nowrap font-bold">Đạo diễn:</div>
                <div className="">
                  {movie.director != null &&
                  movie.director != "" &&
                  movie.director?.length > 0
                    ? movie.director
                        ?.map((director: any) => director)
                        .join(", ")
                    : "Đang cập nhật"}
                </div>
              </div>
              <div className="flex text-sm  mb-4">
                <div className="w-[90px] text-nowrap font-bold">Viễn viên:</div>
                <div className="text-nowarp truncate max-w-[200px]">
                  {movie.actor != null &&
                  movie.actor != "" &&
                  movie.actor?.length > 0
                    ? movie.actor?.map((actor: any) => actor).join(",  ")
                    : "Đang cập nhật"}
                </div>
              </div>
              <div className="flex text-sm mb-4">
                <div className="w-[90px] text-nowrap font-bold">Thể loại:</div>
                <div className="truncate max-w-[230px]">
                  {movie.category
                    .map((cat: any, index: any) => {
                      return (
                        <span key={index} className="text-nowarp truncate">
                          {/* <Link
                            href="/"
                            className={`hover:underline text-nowrap truncate ${
                              index > 0 ? "ml-2" : ""
                            }`}
                          >
                            {cat.name + " "}
                          </Link> */}
                          {cat.name}
                        </span>
                      );
                    })
                    .reduce((prev: any, curr: any) => [prev, ", ", curr])}
                </div>
              </div>
            </div>
            <div className="w-[40%]">
              <div className="flex text-sm mb-4">
                <div className="w-[90px] text-nowrap font-bold">Quốc gia:</div>
                <div className="">
                  {movie.country
                    ? movie.country.map((c: any) => c.name)
                    : "Đang cập nhật"}
                </div>
              </div>
              <div className="flex text-sm mb-4">
                <div className="w-[90px] text-nowrap font-bold">
                  Chất lượng:
                </div>
                <div className="">{movie.quality}</div>
              </div>
              {movie.episode_total && (
                <div className="flex text-sm mb-4">
                  <div className="w-[90px] text-nowrap font-bold">
                    Số tập phim:
                  </div>
                  <div className="">{movie.episode_total}</div>
                </div>
              )}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: movie.content }} />
          {movie.trailer_url && embedUrl && (
            <div className="mt-8">
              <h2 className="text-white text-[20px] font-bold mb-4">Trailer</h2>
              <div className="relative w-full sm:h-[500px] h-[300px]">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-white text-[20px] font-bold mb-4">
              Phim liên quan
            </h2>
            <MovieSlider movies={relatedMovies} numberMovie={3} />
          </div>
          <div className="w-full h-80"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
