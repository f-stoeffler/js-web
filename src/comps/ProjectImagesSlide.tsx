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
      pagination={true}
      spaceBetween={30} 
      className="rounded-xl"
      injectStyles={[
        `.swiper-wrapper { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }`,
        `.swiper-slide { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: auto; 
        }`
      ]}
    >
      {imgs?.map((img) => (
        <SwiperSlide key={img.id}>
          <ProjectImageSlide path={img.imgPath} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}