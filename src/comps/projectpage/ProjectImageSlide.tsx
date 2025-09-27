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
    <div className="mx-auto md:max-h-120 max-w-7/8 flex ">
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
