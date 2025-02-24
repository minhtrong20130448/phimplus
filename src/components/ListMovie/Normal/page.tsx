"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MovieCard from "../../Cards/MovieCard/page";

const NormalListPage = ({ movies, title }: HorizontalMovieListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      const start = scrollLeft;
      const change = scrollAmount - start;
      const duration = 500;
      let startTime: number;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate the new scroll position
        scrollRef.current!.scrollLeft = start + change * progress;

        if (elapsed < duration) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900  hover:bg-opacity-50  h-full w-16"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-lg"
          />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900 hover:bg-opacity-50  h-full w-16"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-white text-lg"
          />
        </button>

        {/* Movie List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 overflow-y-scroll no-scrollbar"
        >
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link href={`/plays/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NormalListPage;
