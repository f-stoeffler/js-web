"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { ProjectImage } from "../../generated/prisma";
import ProjectImageSlide from "./ProjectImageSlide";
import ProjectImageSlideLarge from "./ProjectImageSlideLarge";

export default function ProjectImagesSlideLarge({
  imgs,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
}>) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{
        dynamicBullets: true,
      }}
        navigation={true}
      spaceBetween={30}
      centeredSlides={true}
      className="project-swiper"
    >
      {imgs?.map((img) => (
        <SwiperSlide key={img.id} className="" >
          <ProjectImageSlideLarge path={img.imgPath} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
