import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlide({
  path,
  onOpen,
  imageVer,
}: Readonly<{
  path: string | undefined;
  onOpen: () => void;
  imageVer: Date;
}>) {
  return (
    <div className="mx-auto h-80 md:h-80 lg:h-100 xl:h-130 2xl:h-170 3xl:h-200 max-w-7/8 flex ">
      <Image
        src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/project/${path}?v=${imageVer}`}
        fill
        alt="Project image"
        className="object-contain rounded-xl hover:cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      />
    </div>
  );
}
