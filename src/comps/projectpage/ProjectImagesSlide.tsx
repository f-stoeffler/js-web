"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type
import "swiper/css/pagination";
import { ProjectImage } from "@prisma/client";
import ProjectImageSlide from "./ProjectImageSlide";
import FullscreenImages from "./FullscreenImages";
import { useState, useRef } from "react"; // Import useRef
import "swiper/css/navigation";

export default function ProjectImagesSlide({
  imgs,
  mainImg,
  mainImageVer,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
  mainImg: string | undefined;
  mainImageVer: Date;
}>) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null); // Ref to store Swiper instance
  const swiperRefLarge = useRef<SwiperType | null>(null); // Ref to store Swiper instance

  const chnageLargeToCurrentSlide = () => {
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
        <SwiperSlide className="">
          <ProjectImageSlide
            path={mainImg}
            onOpen={openFullscreen}
            imageVer={mainImageVer}
          />
        </SwiperSlide>
        {imgs?.map((img) => (
          <SwiperSlide key={img.id} className="">
            <ProjectImageSlide
              path={img.imgPath}
              onOpen={openFullscreen}
            imageVer={img.updatedAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <FullscreenImages
        imgs={imgs}
        mainImg={mainImg}
        isOpen={isFullscreenOpen}
        onClose={closeFullscreen}
        swiperRefLarge={swiperRefLarge}
        mainImageVer={mainImageVer}
      />
    </div>
  );
}
