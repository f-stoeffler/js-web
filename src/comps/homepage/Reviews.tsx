'use client'; // Must be at the top for Next.js 13+

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import ReviewComp from './Review';
import { Review } from '../../../generated/prisma';

export default function Reviews({
  reviews,
}: Readonly<{
  reviews: Array<Review> | undefined;
}>) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 32,
            slidesOffsetBefore: 70,
          },
          1500: {
            slidesPerView: 5,
            spaceBetween: 32,
            slidesOffsetBefore: 70,
          },
        }}
      shortSwipes={false}
      loopPreventsSliding={false}
      freeMode={true}
      loop={true}
      grabCursor={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: true,
      }}
      speed={1000}
      className="!px-6">
        
      {reviews?.map((review) => (
      <SwiperSlide key={review.id}>
        <ReviewComp title={review.title} >{review.desc}</ReviewComp>
      </SwiperSlide>
      ))}
    </Swiper>
  );
}