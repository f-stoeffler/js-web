"use client";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import FeaturedItem from "./FeaturedItem";
import { Project } from "@prisma/client";

export default function FeaturedSlide({
  featuredProjects,
}: Readonly<{
  featuredProjects: Array<Project> | undefined;
}>) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={true}
      spaceBetween={30}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="rounded-xl w-full"
    >
      {featuredProjects?.map((project) => (
        <SwiperSlide key={project.slug}>
          <FeaturedItem
            title={project.title}
            img={project.mainImage}
            imgVer={project.mainImageVer}
            slug={project.slug}
          >
            {project.shortDesc}
          </FeaturedItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
