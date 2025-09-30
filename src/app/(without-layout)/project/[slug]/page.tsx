"use server";
import FeaturedSlide from "@/comps/homepage/FeaturedSlide";
import Footer from "@/comps/Footer";
import FullscreenImages from "@/comps/projectpage/FullscreenImages";
import Header from "@/comps/Header";
import ProjectImagesSlide from "@/comps/projectpage/ProjectImagesSlide";
import ProjectImagesSlideLarge from "@/comps/projectpage/ProjectImagesSlideLarge";
import { getFrontPage } from "@/lib/frontPage";
import { getProject } from "@/lib/projects";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import Markdown from "react-markdown";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  function convertNewlines(text: string) {
    return text.replace(/\\n/g, "\n");
  }
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const project = await getProject(slug);
  const processedDesc = project?.desc ? convertNewlines(project.desc) : "";

  // Log authentication status
  console.log("Page - User authenticated:", !!session);
  if (session) {
    console.log("Page - User email:", session.user?.email);
  }

  return (
    <div className="">
      <div className="lg:h-svh flex flex-col">
        <Header />
        <div className="lg:flex-grow grid grid-cols-12 items-center overflow-hidden mt-6 lg:mt-0">
          <div className="col-span-12 lg:col-span-5  lg:pl-8">
            <div>
              <ProjectImagesSlide
                imgs={project?.images}
                mainImg={project?.mainImage}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 px-4 lg:px-16 overflow-y-auto lg:max-h-full">
            <div className="my-5 ">
              {" "}
              {session && (
                <div className="mt-4 p-4 striped-background rounded">
                  <p className="text-sm">
                    Admin mode: You can edit this project
                  </p>
                </div>
              )}
              <h1 className="text-4xl font-bold mb-2.5 text-center md:text-left">
                {project?.title}
              </h1>
              <div className="text-xl lg:text-2xl prose prose-lg ">
                <Markdown>{processedDesc}</Markdown>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
