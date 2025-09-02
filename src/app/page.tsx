"use server";
import FeaturedSlide from "@/comps/FeaturedSlide";
import NavbarItem from "@/comps/NavbarItem";
import Project from "@/comps/Project";
import SkillItemComp from "@/comps/SkillItem";
import Skills from "@/comps/Skills";
import Reviews from "@/comps/Reviews";
import { getFrontPage } from "@/repo/frontPage";
import { getAchievements } from "@/repo/reviews";
import { getSkills } from "@/repo/skills";
import Image from "next/image";

export default async function Home() {
  const frontPage = await getFrontPage("FrontPage");
  const skills = await getSkills("Skills");
  const achievements = await getAchievements("Achievements");
  console.log(frontPage);
  return (
    <div className="">
      <div className="h-svh  flex flex-col">
        <div className="w-full shadow-md border-b-2 border-prim">
          <div className="container mx-auto">
            <div className="flex h-16 mx-6">
              <div className=" font-black flex items-center">
                <Image src="/showtech.png" width={300} height={80} alt="Logo" />
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
        <div className="flex-grow striped-background border-b-2 border-prim">
          <div className="container mx-auto h-full flex items-center">
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
                  <FeaturedSlide imgs={frontPage?.featuredImages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div className="grid grid-cols-3 gap-8 mb-20 items-start">
            <Project title={"testi"} img="project1.jpg">
              testi
            </Project>
            <Project title={"testi"} img="project2.jpg">
              testi
            </Project>
            <Project title={"testi"} img="project3.webp">
              testi
            </Project>
          </div>
        </div>
      </main>
      <footer className="border-t-2 border-prim text-center pt-4 pb-4 mt-12 bg-bg2">
        What the GIM
      </footer>
    </div>
  );
}
