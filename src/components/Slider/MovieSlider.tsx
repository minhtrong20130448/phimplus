"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Slider.module.css";
import Link from "next/link";
import MovieCard from "../Cards/MovieCard/page";
import { useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";

const MovieSlider = ({
  movies,
  title,
  numberMovie,
}: HorizontalMovieListProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div>
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        {/* Nút điều hướng */}
        <button
          ref={prevRef}
          className={`${styles.swiper_button_prev} transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900  hover:bg-opacity-50  h-full swiper-button-prev`}
        ></button>

        <button
          ref={nextRef}
          className={`${styles.swiper_button_next} transform -translate-y-1/2 z-10 p-2 shadow-lg hover:bg-gray-900  hover:bg-opacity-50  h-full swiper-button-next`}
        ></button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          watchOverflow={true}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          slidesPerGroup={3}
          breakpoints={{
            640: { slidesPerView: numberMovie ? numberMovie : 3 },
            1024: { slidesPerView: numberMovie ? numberMovie : 4 },
            1280: { slidesPerView: numberMovie ? numberMovie : 5 },
          }}
          speed={1000}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setTimeout(() => {
              if (typeof swiper?.params?.navigation === "object") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
        >
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              {/* <Link href={`/plays/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link> */}
              <Link href={`/details/${movie.slug}`}>
                <MovieCard movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;
