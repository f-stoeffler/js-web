"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import FeaturedItem from "./FeaturedItem";
import { featuredImage, Project } from "../../../generated/prisma";

export default function FeaturedSlide({
  featuredProjects,
}: Readonly<{
  featuredProjects: Array<Project> | undefined;
}>) {
  return (
    <Swiper modules={[Pagination]} pagination={true}
        spaceBetween={30} className="rounded-xl w-full"  >
      {featuredProjects?.map((project) => (
      <SwiperSlide key={project.slug}>
        <FeaturedItem title={project.title} img={project.mainImage} slug={project.slug} >{project.shortDesc}</FeaturedItem>
      </SwiperSlide>
      ))}
    </Swiper>
  );
}
