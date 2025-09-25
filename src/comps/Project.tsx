import Image from "next/image";

export default function ProjectComp({
  children,
  title,
  img
}: Readonly<{
  children: React.ReactNode;
  title: string;
  img: string;
}>) {
  return (
    <div className="bg-bg2 rounded-lg overflow-hidden">
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
    </div>
  );
}