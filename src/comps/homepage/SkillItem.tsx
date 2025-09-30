import Link from "next/link";

export default function SkillItemComp({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="lg:group pb-4 pt-4 lg:pt-2.5 lg:hover:pt-4 border-prim border-b-2 lg:border-x-2 lg:pb-6 lg:rounded-b-lg px-3 flex flex-col hover:bg-bg2 lg:hover:mt-6 lg:hover:border-t-2 lg:hover:rounded-t-lg transition-all cursor-pointer">
      <h2 className="text-3xl text-center font-bold lg:mb-2.5">{title}</h2>
      <div className="">
        <p className="text-lg text-center">{children}</p>
      </div>
    </div>
  );
}
