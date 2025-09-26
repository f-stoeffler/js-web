
import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlideLarge({
  path,
}: Readonly<{
  path: string;
}>) {
  return (
    <div className="mx-auto md:max-h-svh p-5 max-w-7/8 flex ">
      <Image
        src={`/projects/${path}`}
        height={1300}
        width={1300}
        alt="Project image"
        className="object-contain rounded-xl"
      />
    </div>
  );
}