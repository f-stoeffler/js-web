import Link from "next/link";

export default function NavbarItem({
  children, url, isAdmin
}: Readonly<{
  children: React.ReactNode;
  url: string;
  isAdmin?: Boolean | undefined;
}>) {
  return isAdmin ? (
    <Link
      className="p-4 mt-3 bg-bg2 md:mt-0 hover:bg-bg2 hover:border-b-3 border-prim transition-all flex items-center h-full duration-50"
      href={url}
    >
      {children}
    </Link>) : (
    <Link
      className="p-4 mt-3 md:mt-0 hover:bg-bg2 hover:border-b-3 border-prim transition-all flex items-center h-full duration-50 "
      href={url}
    >
      {children}
    </Link>
  );
}
