import Image from "next/image";
import Link from "next/link";

export default function ProjectComp({
  children,
  title,
  slug,
  img
}: Readonly<{
  children: React.ReactNode;
  title: string;
  slug: string;
  img: string;
}>) {
  return (
    <Link href={`/project/${slug}`} className="striped-background rounded-lg overflow-hidden border-4 hover:border-priml border-bg2 hover:cursor-pointer transition-all active:border-primd">
      <div className="w-full h-64 relative">
        <Image
          src={`/projects/${img}`}
          fill
          alt="flowers"
          className="object-cover"
        />
      </div>
      <div className="px-6 py-4">
        <h3 className="text-2xl mb-2">{title}</h3>
        <p>{children}</p>
      </div>
    </Link>
  );
}