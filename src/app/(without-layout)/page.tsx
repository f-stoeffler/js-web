"use server";
import Skills from "@/comps/homepage/Skills";
import Reviews from "@/comps/homepage/Reviews";
import { getFrontPage } from "@/lib/frontPage";
import { getAchievements } from "@/lib/reviews";
import { getSkills } from "@/lib/skills";
import ProjectsComp from "@/comps/homepage/Projects";
import { getAllFeaturedProjects } from "@/lib/projects";
import HeaderHome from "@/comps/HeaderHome";
import Footer from "@/comps/Footer";

export default async function Home() {
  const skills = await getSkills("Skills");
  const achievements = await getAchievements("Achievements");
  const frontPage = await getFrontPage("FrontPage");
  const featuredProjects = await getAllFeaturedProjects();
  return (
    <div className="">
      <HeaderHome featuredProjects={featuredProjects} frontPage={frontPage}/>
      <main>
        <div>
          <div className="lg:container mx-auto lg:px-6">
            <Skills skills={skills?.skillItems} />
          </div>
          <div className="bg-bg2 py-6 mt-20 border-y-2 border-prim">
            <div className=" container mx-auto px-4 sm:px-6">
              <div className="">
                <div className="text-center mb-8">
                  <h1 className="font-bold text-5xl mb-2">
                    {achievements?.title}
                  </h1>
                  <p>{achievements?.desc}</p>
                </div>
              </div>
            </div>
            <Reviews reviews={achievements?.reviews} />
          </div>
        </div>{" "}
        <div className="sm:container mx-auto sm:px-6 mt-18">
          <div className="">
            <div className="text-center mb-8 px-4 sm:px-0">
              <h1 className="font-bold text-5xl mb-2  ">Portfolio</h1>
              <p>{achievements?.desc}</p>
            </div>
          </div>
          <ProjectsComp />
        </div>
      </main>
      <Footer />
    </div>
  );
}
