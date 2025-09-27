"use client";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import FeaturedSlide from "./homepage/FeaturedSlide";
import { getFrontPage } from "@/repo/frontPage";
import { Prisma, Project } from "../../generated/prisma";
import { FrontPage } from "../../generated/prisma";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function HeaderContent({
  frontPage,
  featuredProjects,
}: Readonly<{
  featuredProjects: Array<Project>;
  frontPage: Prisma.FrontPageGetPayload<{
    include: { featuredImages: true };
  }> | null;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return isHomePage ? (
    <div className="min-h-svh  flex flex-col">
      <div className="w-full shadow-md border-b-2 border-prim">
        <div className="container mx-auto">
          <div className="flex h-16 mx-6">
            <div className=" font-black flex items-center">
            <Link href="/">
              <Image src="/showtech.png" width={300} height={80} alt="Logo" />
            </Link>
            </div>
            <div className="flex justify-end h-full w-full">
              <NavbarItem url="/gugu">Leistungen</NavbarItem>
              <NavbarItem url="/gaga">Kontakt</NavbarItem>
              <NavbarItem url="/gaga">Preise</NavbarItem>
              <NavbarItem url="/gugu">Musik</NavbarItem>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow striped-background border-b-2 border-prim flex items-center">
        <div className="container mx-auto h-full flex my-5">
          <div className="mx-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="flex items-center mx-auto">
                <div className="gap-4 grid grid-cols-1">
                  <h1 className="font-bold text-5xl text-center">
                    {frontPage?.title}
                  </h1>
                  <p className="text-center text-lg">{frontPage?.desc}</p>
                  <button className="rounded-lg border-2 border-prim text-xl py-2 text-prim hover:bg-prim hover:text-fg transition-all cursor-pointer">
                    {frontPage?.btnText}
                  </button>
                </div>
              </div>
              <div>
                <FeaturedSlide featuredProjects={featuredProjects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full shadow-md border-b-2 border-prim">
      <div className="container mx-auto">
        <div className="flex h-16 mx-6">
          <div className=" font-black flex items-center">
            <Link href="/">
              <Image src="/showtech.png" width={300} height={80} alt="Logo" />
            </Link>
          </div>
          <div className="flex justify-end h-full w-full">
            <NavbarItem url="/gugu">Leistungen</NavbarItem>
            <NavbarItem url="/gaga">Kontakt</NavbarItem>
            <NavbarItem url="/gaga">Preise</NavbarItem>
            <NavbarItem url="/gugu">Musik</NavbarItem>
          </div>
        </div>
      </div>
    </div>
  );
}
