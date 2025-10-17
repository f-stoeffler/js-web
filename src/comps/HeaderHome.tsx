
import FeaturedSlide from "./homepage/FeaturedSlide";
import { Prisma, Project } from "@prisma/client";
import Header from "./Header";
import Link from "next/link";

export default async function HeaderHome({
  frontPage,
  featuredProjects,
}: Readonly<{
  featuredProjects: Array<Project>;
  frontPage: Prisma.FrontPageGetPayload<{
    include: { featuredImages: true };
  }> | null;
}>) {
  
  return (
    <div className="min-h-svh  flex flex-col">
      <Header/>
      <div className="flex-grow striped-background border-b-2 border-prim flex items-center">
        <div className="md:container mx-auto h-full flex my-5">
          <div className="mx-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="flex items-center mx-auto">
                <div className="gap-4 grid grid-cols-1">
                  <h1 className="font-bold text-5xl text-center">
                    {frontPage?.title}
                  </h1>
                  <p className="text-center text-lg">{frontPage?.desc}</p>
                  <Link href={frontPage?.btnHref || "/"} className="rounded-lg border-2 border-prim text-xl py-2 text-prim hover:bg-prim hover:text-fg transition-all cursor-pointer text-center">
                    {frontPage?.btnText}
                  </Link>
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
  );
}
