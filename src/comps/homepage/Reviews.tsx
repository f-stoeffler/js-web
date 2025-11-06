'use client'; // Must be at the top for Next.js 13+

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import ReviewComp from './Review';
import { Review } from '@prisma/client';

export default function Reviews({
  reviews,
}: Readonly<{
  reviews: Array<Review> | undefined;
}>) {
  if (reviews)
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      breakpoints={{
          0: {
            loop: reviews.length > 1,
            slidesPerView: 1,
            spaceBetween: 8,
          },
          800: {
            loop: reviews.length > 3,
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            loop: reviews.length > 4,
            slidesPerView: 4,
            spaceBetween: 32,
          },
          1500: {
            loop: reviews.length > 5,
            slidesPerView: 5,
            spaceBetween: 32,
          },
      }}
      centerInsufficientSlides={true}
      grabCursor={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: true,
      }}
      speed={1000}
      className="!px-6">
        
      {reviews?.map((review) => (
      <SwiperSlide key={review.id} className=''>
        <ReviewComp title={review.title} >{review.desc}</ReviewComp>
      </SwiperSlide>
      ))}
    </Swiper>
  );
}