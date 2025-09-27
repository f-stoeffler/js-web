"use server";
import FeaturedSlide from "@/comps/homepage/FeaturedSlide";
import NavbarItem from "@/comps/NavbarItem";
import ProjectComp from "@/comps/homepage/Project";
import SkillItemComp from "@/comps/homepage/SkillItem";
import Skills from "@/comps/homepage/Skills";
import Reviews from "@/comps/homepage/Reviews";
import { getFrontPage } from "@/repo/frontPage";
import { getAchievements } from "@/repo/reviews";
import { getSkills } from "@/repo/skills";
import Image from "next/image";
import Header from "@/comps/HeaderContent";
import Footer from "@/comps/Footer";
import ProjectsComp from "@/comps/homepage/Projects";
import { getAllFeaturedProjects } from "@/repo/projects";

export default async function Home() {
  const skills = await getSkills("Skills");
  const achievements = await getAchievements("Achievements");
  return (
    <div className="">
      <main>
        <div>
          <div className="container mx-auto px-6">
            <Skills skills={skills?.skillItems} />
          </div>
          <div className="bg-bg2 py-6 mt-20 border-y-2 border-prim">
            <div className=" container mx-auto px-6">
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
        <div className="container mx-auto px-6 mt-18">
          <div className="">
            <div className="text-center mb-8">
              <h1 className="font-bold text-5xl mb-2">Portfolio</h1>
              <p>{achievements?.desc}</p>
            </div>
          </div>
          <ProjectsComp />
        </div>
      </main>
    </div>
  );
}
