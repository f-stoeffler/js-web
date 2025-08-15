import Link from "next/link";

export default function NavbarItem({
  children, url
}: Readonly<{
  children: React.ReactNode;
  url: string;
}>) {
  return (
    <Link
      className="p-4 hover:bg-bg2 hover:border-b-3 border-prim transition-all flex items-center h-full duration-50 "
      href={url}
    >
      {children}
    </Link>
  );
}
