"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { MOVIE_SLICE_NAME, play, playEpisode, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

const EpisodeListPage = ({ episodes, title }: HorizontalEpisodeListProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePlay = (episode: any) => {
    console.log("Play", episode);
    dispatch(
      playEpisode({
        episode_play: episode.link_embed,
      })
    );
  };
  const episode_play = useAppSelector(
    (state) => state[MOVIE_SLICE_NAME]?.play?.episode_play
  );

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {/* Movie List */}
      <div className="flex overflow-y-scroll flex-wrap gap-4 justify-start">
        {episodes.map((episode: any, index: any) => (
          <div key={index}>
            <button
              onClick={() => handlePlay(episode)}
              className={`block py-2 rounded-md text-white bg-blue-600 font-bold w-24 ${
                episode_play === episode.link_embed
                  ? "bg-blue-800"
                  : "hover:bg-blue-800"
              }`}
            >
              Tập {episode.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeListPage;
