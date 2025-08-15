import Link from "next/link";


export default function WorkItem({
  children,
}: Readonly<{
  children: React.ReactNode;
  // title: string;
}>) {
  return (
    <div className="bg-bg2 px-6 py-4 basis-1/6 flex-none rounded-lg">{children}</div>
  );
}