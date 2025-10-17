
import Image from "next/image";
import Link from "next/link";
import "swiper/css/pagination";

export default function FeaturedItem({
  children,
  title,
  img,
  slug,
  imgVer,
}: Readonly<{
  slug: string;
  img: string;
  children: React.ReactNode;
  title: string;
  imgVer: Date;
}>) {
  return (
    <div  className="relative w-full h-86 xl:h-112 2xl:h-144 3xl:h-168 rounded-lg">
      <Link href={`/project/${slug}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/project/${img}?v=${imgVer}`}
        fill
        alt="flowers"
        className=" object-cover rounded-lg"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-linear-to-t from-black/90 to-transparent text-white">
        <div className="pt-8 pb-9 text-center">
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <p>{children}</p>
        </div>
      </div>
      </Link>
    </div>
  );
}
