"use server";
import FeaturedSlide from "@/comps/homepage/FeaturedSlide";
import Footer from "@/comps/Footer";
import FullscreenImages from "@/comps/projectpage/FullscreenImages";
import Header from "@/comps/Header";
import ProjectImagesSlide from "@/comps/projectpage/ProjectImagesSlide";
import ProjectImagesSlideLarge from "@/comps/projectpage/ProjectImagesSlideLarge";
import { getFrontPage } from "@/repo/frontPage";
import { getProject } from "@/repo/projects";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  return (
    <div className="">
      <div className="h-svh flex flex-col">
        <Header />
        <div className="flex-grow grid grid-cols-12 items-center overflow-hidden">
          <div className="col-span-5 pl-8">
            <div>
          <ProjectImagesSlide imgs={project?.images} mainImg={project?.mainImage} /></div>
          </div>
          <div className="col-span-7 pl-8 overflow-y-scroll max-h-svh">
            <div className="my-25">
              <h1 className="text-3xl font-bold mb-2.5">{project?.title}</h1>
              <p className="text-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                harum iste, eos nemo quas sit! Incidunt hic, aspernatur fugiat
                maiores accusamus totam odit dolore iusto doloremque et magnam
                iste sit? Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Placeat, quaerat! Quod velit nihil fugiat assumenda
                repellendus consectetur vitae veritatis debitis est! Eaque
                dolorem accusamus magni illo deserunt beatae, praesentium quis?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                modi maxime reprehenderit molestiae ea eveniet, minus unde porro
                numquam esse consectetur, sint totam veritatis odio nulla alias
                nihil dolorum animi? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Nulla quidem incidunt quos molestiae optio eum
                excepturi dolorum non voluptate saepe suscipit libero officiis,
                aperiam, corporis ratione aliquam! Praesentium, explicabo
                maxime? Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Quia harum iste, eos nemo quas sit! Incidunt hic,
                aspernatur fugiat maiores accusamus totam odit dolore iusto
                doloremque et magnam iste sit? Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Placeat, quaerat! Quod velit
                nihil fugiat assumenda repellendus consectetur vitae veritatis
                debitis est! Eaque dolorem accusamus magni illo deserunt beatae,
                praesentium quis? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem modi maxime reprehenderit molestiae ea
                eveniet, minus unde porro numquam esse consectetur, sint totam
                veritatis odio nulla alias nihil dolorum animi? Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Nulla quidem
                incidunt quos molestiae optio eum excepturi dolorum non
                voluptate saepe suscipit libero officiis, aperiam, corporis
                ratione aliquam! Praesentium, explicabo maxime? Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Quia harum iste,
                eos nemo quas sit! Incidunt hic, aspernatur fugiat maiores
                accusamus totam odit dolore iusto doloremque et magnam iste sit?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Placeat, quaerat! Quod velit nihil fugiat assumenda repellendus
                consectetur vitae veritatis debitis est! Eaque dolorem accusamus
                magni illo deserunt beatae, praesentium quis? Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Quidem modi maxime
                reprehenderit molestiae ea eveniet, minus unde porro numquam
                esse consectetur, sint totam veritatis odio nulla alias nihil
                dolorum animi? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Nulla quidem incidunt quos molestiae optio eum
                excepturi dolorum non voluptate saepe suscipit libero officiis,
                aperiam, corporis ratione aliquam! Praesentium, explicabo
                maxime? Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Quia harum iste, eos nemo quas sit! Incidunt hic,
                aspernatur fugiat maiores accusamus totam odit dolore iusto
                doloremque et magnam iste sit? Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Placeat, quaerat! Quod velit
                nihil fugiat assumenda repellendus consectetur vitae veritatis
                debitis est! Eaque dolorem accusamus magni illo deserunt beatae,
                praesentium quis? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem modi maxime reprehenderit molestiae ea
                eveniet, minus unde porro numquam esse consectetur, sint totam
                veritatis odio nulla alias nihil dolorum animi? Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Nulla quidem
                incidunt quos molestiae optio eum excepturi dolorum non
                voluptate saepe suscipit libero officiis, aperiam, corporis
                ratione aliquam! Praesentium, explicabo maxime?
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
