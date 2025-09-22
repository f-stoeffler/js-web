"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { ProjectImage } from "../../generated/prisma";
import ProjectImageSlide from "./ProjectImageSlide";
import FullscreenImages from "./FullscreenImages";
import { useState } from "react"; // Import useState

export default function ProjectImagesSlide({
  imgs,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
}>) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  return (
    <div>
      <Swiper
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={30}
        centeredSlides={true}
        className="project-swiper"
      >
        {imgs?.map((img) => (
          <SwiperSlide key={img.id} className="">
            <ProjectImageSlide path={img.imgPath} 
          onOpen={openFullscreen} />
          </SwiperSlide>
        ))}
      </Swiper>
      <FullscreenImages 
        imgs={imgs} 
        isOpen={isFullscreenOpen} 
        onClose={closeFullscreen} 
      />
    </div>
  );
}