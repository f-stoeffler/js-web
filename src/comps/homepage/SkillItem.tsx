import Link from "next/link";


export default function SkillItemComp({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="group pt-2.5 hover:pt-4 border-prim border-b-2 border-x-2 pb-6 rounded-b-lg px-3 flex flex-col hover:bg-bg2 hover:mt-6 hover:border-t-2 hover:rounded-t-lg transition-all cursor-pointer">
      <h2 className="text-3xl text-center font-bold mb-2.5">{title}</h2>
      <div className="">
        <p className="text-lg text-center">{children}</p>
      </div>
    </div>
  );
}