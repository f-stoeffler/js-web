import Link from "next/link";

export default function FooterItemComp({
  children,
  url,
}: Readonly<{
  children: React.ReactNode;
  url: string;
}>) {
  return (url === "" || url == undefined) ? (
    <span className="text-fg2">{children}</span>
  ) : (
    <Link href={url} className="text-fg2 hover:text-prim transition-colors">
      {children}
    </Link>
  );
}
