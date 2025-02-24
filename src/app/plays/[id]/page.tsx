"use client";
import EpisodeListPage from "../../../components/ListMovie/Episodes/page";
import { MOVIE_SLICE_NAME, useAppSelector } from "@/store";
export default function MoviePlayer({ params }: { params: { id: string } }) {
  const movie = useAppSelector((state) => state[MOVIE_SLICE_NAME]?.play?.movie);
  const episodes = useAppSelector(
    (state) => state[MOVIE_SLICE_NAME]?.play?.episodes
  );
  const episode_play = useAppSelector(
    (state) => state[MOVIE_SLICE_NAME]?.play?.episode_play
  );

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <main className="">
      <div className="w-screen h-[calc(100vh-100px)]">
        <div className="h-full w-full flex items-center justify-center pt-4">
          {episode_play && (
            <iframe
              src={episode_play}
              allowFullScreen
              frameBorder="0"
              className="max-w-screen-xl w-full h-full p-4 pt-0"
            ></iframe>
          )}
        </div>
      </div>
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 text-white mb-4">
              {movie.name}
            </h1>
            <div
              className="text-sm text-gray-300 mr-8"
              dangerouslySetInnerHTML={{ __html: movie.content }}
            />
          </div>
          <div className="col-span-1">
            {/* dien vien, dao dien */}
            <div className="flex mb-4 text-sm">
              <div className="w-1/3">Đạo diễn:</div>
              <div className="w-2/3">
                {movie.director != null &&
                movie.director != "" &&
                movie.director?.length > 0
                  ? movie.director?.map((director: any) => director).join(", ")
                  : "Đang cập nhật"}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/3 h-12">Diễn viên:</div>
              <div className="w-2/3 h-12">
                {" "}
                {movie.actor != null &&
                movie.actor != "" &&
                movie.actor?.length > 0
                  ? movie.actor?.map((actor: any) => actor).join(",  ")
                  : "Đang cập nhật"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {movie?.tmdb?.type === "tv" && (
        <div className="w-full max-w-screen-xl mx-auto py-4">
          <EpisodeListPage
            movie={movie}
            episodes={episodes?.[0].server_data || []}
            title="Danh sách tập phim"
          />
        </div>
      )}
      <div className="w-full h-36"></div>
    </main>
  );
}
