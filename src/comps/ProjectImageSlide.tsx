
import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlide({
  path,
}: Readonly<{
  path: string;
}>) {
  return (
    <div className="">
      <Image
        src={`/projects/${path}`}
        height={1300}
        width={1300}
        alt="Project image"
        className="rounded-xl"
      />
    </div>
  );
}