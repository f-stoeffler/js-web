"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type
import "swiper/css/pagination";
import { ProjectImage } from "../../generated/prisma";
import ProjectImageSlide from "./ProjectImageSlide";
import FullscreenImages from "./FullscreenImages";
import { useState, useRef } from "react"; // Import useRef
import "swiper/css/navigation";

export default function ProjectImagesSlide({
  imgs,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
}>) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null); // Ref to store Swiper instance
  const swiperRefLarge = useRef<SwiperType | null>(null); // Ref to store Swiper instance

  const chnageLargeToCurrentSlide = () => {
    console.log(swiperRefLarge.current);
    if (swiperRefLarge.current && swiperRef.current) {
      swiperRefLarge.current.slideTo(swiperRef.current.activeIndex, 0); // 0-based index
    }
  };
  const openFullscreen = () => {
    setIsFullscreenOpen(true);
    setTimeout(() => {
      chnageLargeToCurrentSlide();
    }, 100); // Delay to ensure the
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };


  return (
    <div>
      <Swiper
      modules={[Pagination, Navigation]}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={30}
      navigation={true}
        centeredSlides={true}
        className="project-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Store Swiper instance when it's initialized
        }}
      >
        {imgs?.map((img) => (
          <SwiperSlide key={img.id} className="">
            <ProjectImageSlide path={img.imgPath} onOpen={openFullscreen} chnageLargeToCurrentSlide={chnageLargeToCurrentSlide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <FullscreenImages
        imgs={imgs}
        isOpen={isFullscreenOpen}
        onClose={closeFullscreen}
        swiperRefLarge={swiperRefLarge}
      />
    </div>
  );
}
