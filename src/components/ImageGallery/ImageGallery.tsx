import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageGalleryComponent.css";
import { ImageGalleryProps } from "../types/props";

const ImageGalleryComponent = ({ items }: ImageGalleryProps) => {
  if (!items || items.length === 0)
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-stroke bg-gray-300 dark:bg-boxdark">
        <svg
          className="h-[48px] w-[48px] text-gray-800 dark:text-white"
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
            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
          />
        </svg>
      </div>
    );

  return (
    <div className="gallery-container">
      <ImageGallery
        items={items} // Danh sách ảnh
        showThumbnails={true} // Hiển thị ảnh thu nhỏ
        showFullscreenButton={false} // Nút fullscreen
        showPlayButton={false} // Nút trình chiếu
        autoPlay={true} // Tự động phát
        slideInterval={3000} // Thời gian giữa các slide (ms)
        showNav={false} // Hiển thị nút điều hướng
        thumbnailWidth={50} // Chiều rộng của ảnh thu nhỏ
      />
    </div>
  );
};

export default ImageGalleryComponent;
