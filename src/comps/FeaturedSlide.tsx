"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import FeaturedItem from "./FeaturedItem";
import { featuredImage } from "../../generated/prisma";

export default function FeaturedSlide({
  imgs,
}: Readonly<{
  imgs: Array<featuredImage> | undefined;
}>) {
  return (
    <Swiper modules={[Pagination]} pagination={true} className="rounded-xl w-full"  >
      {imgs?.map((img) => (
      <SwiperSlide key={img.id}>
        <FeaturedItem title={img.title} >{img.desc}</FeaturedItem>
      </SwiperSlide>
      ))}
    </Swiper>
  );
}
