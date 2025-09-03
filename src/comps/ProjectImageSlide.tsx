
import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlide({
  path,
}: Readonly<{
  path: string;
}>) {
  return (
    <div className="flex items-center justify-center h-full">
      <Image
        src={`/projects/${path}`}
        height={1300}
        width={1300}
        alt="Project image"
        className="object-contain max-h-full"
      />
    </div>
  );
}