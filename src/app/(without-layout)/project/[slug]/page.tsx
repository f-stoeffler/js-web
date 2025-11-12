"use server";
import FooterComp from "@/comps/Footer";
import ProjectImagesSlide from "@/comps/projectpage/ProjectImagesSlide";
import { getProject } from "@/lib/projects";
import "swiper/css";
import "swiper/css/pagination";
import Markdown from "react-markdown";
import { checkIfUserIsAdmin } from "@/lib/auth";
import Header from "@/comps/Header";
import ProjectDescEditor from "@/comps/projectpage/ProjectDescEditor";
import Link from "next/link";
import ProjectTitle from "@/comps/projectpage/ProjectTitle";
import ProjectChangeImageModal from "@/comps/projectpage/ProjectChangeImageModal";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const isAdmin = await checkIfUserIsAdmin();
  const { slug } = await params;
  const project = await getProject(slug);

  if (project === null || project?.slug === undefined || (project.public === false && isAdmin === false)) {
    return (
      <div className="h-svh flex flex-col">
        <Header />
        <div className="flex-grow items-center justify-center flex">
          <div className="text-center">
            Dieses Projekt existiert nicht.
            <br />
            <Link href="/" className="text-prim underline hover:no-underline">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
        <FooterComp />
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="2md:h-svh flex flex-col">
          <Header />
          <div className="2md:flex-grow grid grid-cols-12 items-center overflow-hidden mt-6 2md:mt-0">
            <div className="col-span-12 2md:col-span-5  2md:pl-8">
              <div>
                <ProjectImagesSlide
                  imgs={project?.images}
                  mainImg={project?.mainImage}
                  mainImageVer={project.mainImageVer}
                />
              </div>
            </div>
            <div className="col-span-12 2md:col-span-7 px-4 sm:px-12 2md:px-16 overflow-y-auto 2md:max-h-full">
              <div className="my-5 ">
                {" "}
                <div className="">
                  {isAdmin ? (
                    <>
                      <ProjectDescEditor
                        isAdmin={isAdmin}
                        initialDesc={project.desc}
                        slug={project.slug}
                        initialTitle={project.title}
                      />
                      <ProjectChangeImageModal isAdmin={isAdmin} imgs={project.images} mainImg={project.mainImage} slug={project.slug} mainImgVer={project.mainImageVer} title={project.title} />
                    </>
                  ) : (
                    <>
                      <ProjectTitle title={project.title} />
                      <div className="prose prose-lg 1.5xl:prose-xl 2xl:prose-2xl dark:prose-invert max-w-none single-break">
                        <Markdown>{project.desc}</Markdown>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <FooterComp />
        </div>
      </div>
    );
  }
}
