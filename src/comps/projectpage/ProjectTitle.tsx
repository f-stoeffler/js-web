import Link from "next/link";

export default function ProjectTitle({
  editing,
  title,
}: Readonly<{
  editing?: boolean | undefined;
  title: string;
}>) {
  const editable = editing === true;
  return (
      <h1 className="text-3xl md:text-3xl 1.5xl:text-4.5xl 2xl:text-5xl font-bold mb-4 xl:mb-4.5 2xl:mb-6 3xl:mb-7 text-center w-full bg-prim py-2 px-2.5 rounded-lg">
        {title}
      </h1>
  );
}
