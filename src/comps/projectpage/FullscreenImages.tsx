"use client";
import 'swiper/css/pagination';
import ProjectImagesSlideLarge from "./ProjectImagesSlideLarge";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Swiper as SwiperType } from "swiper"; // Import Swiper type
import { RefObject } from "react";
import { ProjectImage } from '@prisma/client';

export default function FullscreenImages({
  mainImg,
  imgs,
  isOpen,
  onClose,
  swiperRefLarge,
}: Readonly<{
  mainImg: string | undefined;
  imgs: Array<ProjectImage> | undefined;
  swiperRefLarge: RefObject<SwiperType | null>;
  isOpen: boolean;
  onClose: () => void;
}>) {
  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-screen bg-black/60 z-20 flex"
    >
      <div 
        className="w-full h-screen p-5 flex items-center justify-center large-imgs"
      >
        <ProjectImagesSlideLarge imgs={imgs} mainImg={mainImg} swiperRefLarge={swiperRefLarge}  />
        
        {/* Optional: Add a close button */}
        <button 
          className="absolute top-4 right-4 bg-prim text-fg p-2 rounded-full z-30 hover:cursor-pointer hover:bg-red-500 transition-all"
          onClick={onClose}
        >
          <i className="bi bi-x-lg text-4xl mx-0.5"></i>
        </button>
      </div>
    </div>
  );
}