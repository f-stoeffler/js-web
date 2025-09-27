"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { ProjectImage } from "../../../generated/prisma";
import ProjectImageSlide from "./ProjectImageSlide";
import ProjectImageSlideLarge from "./ProjectImageSlideLarge";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type
import { Ref, RefObject } from "react";

export default function ProjectImagesSlideLarge({
  imgs,
  mainImg,
  swiperRefLarge,
}: Readonly<{
  mainImg: string | undefined;
  imgs: Array<ProjectImage> | undefined;
  swiperRefLarge: RefObject<SwiperType | null>;
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
      onSwiper={(swiper) => {
        swiperRefLarge.current = swiper; // Store Swiper instance when it's initialized
      }}
    >
      <SwiperSlide className="">
        <ProjectImageSlideLarge
          path={mainImg}
        />
      </SwiperSlide>
      {imgs?.map((img) => (
        <SwiperSlide key={img.id} className="">
          <ProjectImageSlideLarge path={img.imgPath} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
