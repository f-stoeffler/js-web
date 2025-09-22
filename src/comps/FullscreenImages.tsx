"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import FeaturedItem from "./FeaturedItem";
import { featuredImage, ProjectImage } from "../../generated/prisma";
import ProjectImagesSlideLarge from "./ProjectImagesSlideLarge";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FullscreenImages({
  imgs,
  isOpen,
  onClose,
}: Readonly<{
  imgs: Array<ProjectImage> | undefined;
  isOpen: boolean;
  onClose: () => void;
}>) {
  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-svh bg-black/50 z-20 flex"
      onClick={onClose} // Close when clicking the background
    >
      <div 
        className="w-full h-svh p-5 flex items-center justify-center large-imgs"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <ProjectImagesSlideLarge imgs={imgs}  />
        
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