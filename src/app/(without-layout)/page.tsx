"use server";
import Skills from "@/comps/homepage/Skills";
import Reviews from "@/comps/homepage/Reviews";
import { getFrontPage } from "@/lib/frontPage";
import { getReviews } from "@/lib/reviews";
import { getSkills } from "@/lib/skills";
import ProjectsComp from "@/comps/homepage/Projects";
import {
  getAllFeaturedProjects,
  getProjectsPageWithoutProjects,
} from "@/lib/projects";
import HeaderHome from "@/comps/HeaderHome";
import FooterComp from "@/comps/Footer";

export default async function Home() {
  const skills = await getSkills();
  const achievements = await getReviews();
  const frontPage = await getFrontPage();
  const featuredProjects = await getAllFeaturedProjects();
  const projectsPagePart = await getProjectsPageWithoutProjects();
  return (
    <div className="">
      <HeaderHome featuredProjects={featuredProjects} frontPage={frontPage} />
      <main>
        <div>
          <div className="lg:container mx-auto lg:px-6" id="info-cards">
            <Skills skills={skills?.skillItems} />
          </div>
          {achievements?.title !== "" && achievements?.title !== undefined && (
            <div className="bg-bg2 py-6 mt-20 border-y-2 border-prim" id="reviews">
              <div className=" container mx-auto px-4 sm:px-6">
                <div className="">
                  <div className="text-center mb-8">
                    <h1 className="font-bold text-5xl mb-2">
                      {achievements.title}
                    </h1>
                    {achievements?.desc !== "" &&
                      achievements?.desc !== undefined && (
                        <p className="text-xl">{achievements.desc}</p>
                      )}
                  </div>
                </div>
              </div>
              <Reviews reviews={achievements?.reviews} />
            </div>
          )}
        </div>{" "}
        <div className="sm:container mx-auto sm:px-6 mt-16" id="projects">
          <div className="">
            <div className="text-center mb-8 px-4 sm:px-0">
              <h1 className="font-bold text-5xl mb-2  ">
                {projectsPagePart?.title}
              </h1>
              {projectsPagePart?.desc !== "" &&
                projectsPagePart?.desc !== undefined && (
                  <p className="text-xl">{projectsPagePart?.desc}</p>
                )}
            </div>
          </div>
          <ProjectsComp isAdmin={false} />
        </div>
      </main>
      <FooterComp />
    </div>
  );
}
