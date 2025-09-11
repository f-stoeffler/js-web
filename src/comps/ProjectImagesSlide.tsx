"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import { ProjectImage } from "../../generated/prisma";
import ProjectImageSlide from "./ProjectImageSlide";

export default function ProjectImagesSlide({
  imgs,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
}>) {
  return (
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
          <ProjectImageSlide path={img.imgPath} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}