import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlide({
  path,
  onOpen,
  chnageLargeToCurrentSlide: printCurrentSlideProp,
}: Readonly<{
  path: string | undefined;
  onOpen: () => void;
  chnageLargeToCurrentSlide: () => void;
}>) {
  return (
    <div className="mx-auto h-80 md:h-80 lg:h-100 xl:h-130 2xl:h-170 3xl:h-200 max-w-7/8 flex ">
      <Image
        src={`/projects/${path}`}
        height={1300}
        width={1300}
        alt="Project image"
        className="object-contain rounded-xl hover:cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      />
    </div>
  );
}
