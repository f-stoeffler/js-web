
import Image from "next/image";
import "swiper/css/pagination";

export default function FeaturedItem({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="relative">
      <Image
        src="/featured/js.jpg"
        height={1300}
        width={1300}
        alt="flowers"
        className="w-full"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-linear-to-t from-black/90 to-transparent text-white">
        <div className="pt-8 pb-9 text-center">
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}
