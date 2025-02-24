"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Slider.module.css";
import Link from "next/link";
import MovieBasicCard from "../Cards/MovieBasicCard";

const MovieBasicSlider = ({ movies, title }: HorizontalMovieListProps) => {
  return (
    <div>
      {title && <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>}
      <div className="relative">
        {/* Nút điều hướng */}
        <button
          className={`${styles.swiper_button_prev} transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900  hover:bg-opacity-50  h-full swiper-button-prev`}
        ></button>

        <button
          className={`${styles.swiper_button_next} transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900  hover:bg-opacity-50  h-full swiper-button-next`}
        ></button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerGroup={3}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          speed={1000}
        >
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link href={`/plays/${movie.id}`}>
                <MovieBasicCard movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieBasicSlider;
