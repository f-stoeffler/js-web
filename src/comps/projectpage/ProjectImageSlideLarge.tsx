
import Image from "next/image";
import "swiper/css/pagination";

export default function ProjectImageSlideLarge({
  path,
}: Readonly<{
  path: string | undefined;
}>) {
  return (
    <div className="mx-auto max-h-svh p-2 lg:p-5 lg:max-w-7/8 flex justify-center">
      <Image
        src={`/projects/${path}`}
        height={1300}
        width={1300}
        alt="Project image"
        className="object-contain flex-grow"
      />
    </div>
  );
}