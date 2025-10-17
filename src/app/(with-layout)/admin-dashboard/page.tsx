"use server";

import CreateProjectComp from "@/comps/admin-dashboard/CreateProject";
import EditFrontPage from "@/comps/admin-dashboard/EditFrontPage";
import EditProjectsSection from "@/comps/admin-dashboard/EditProjectsSection";
import EditReviewsSection from "@/comps/admin-dashboard/EditReviewsSection";
import EditSkillsSection from "@/comps/admin-dashboard/EditSkillsSection";
import ProjectsComp from "@/comps/homepage/Projects";
import { checkIfUserIsAdmin } from "@/lib/auth";
import { getFrontPage } from "@/lib/frontPage";
import { getProjectsPageWithoutProjects } from "@/lib/projects";
import {
  getReviewsSectionWithoutReviews,
} from "@/lib/reviews";
import { getSkills } from "@/lib/skills";
import { SkillItem, Skills } from "@prisma/client";

export default async function AdminDashboard() {
  const isAdmin = await checkIfUserIsAdmin();

  const frontPage = await getFrontPage();
  const reviews = await getReviewsSectionWithoutReviews();
  const projectsPagePart = await getProjectsPageWithoutProjects();
  const skillsPagePart:
    | ({
        skillItems: SkillItem[];
      } & Skills)
    | null = await getSkills();

  return (
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-6 gap-4 mb-8">
        <CreateProjectComp />
        {frontPage && <EditFrontPage data={frontPage} className="col-span-3" />}
        {reviews && (
          <EditReviewsSection data={reviews} className="col-span-2" />
        )}
        {projectsPagePart && (
          <EditProjectsSection data={projectsPagePart} className="col-span-2" />
        )}
        {skillsPagePart && (
          <EditSkillsSection data={skillsPagePart} className="col-span-4" />
        )}
      </div>
      <main className="flex justify-center items-center my-4 ">
        <ProjectsComp isAdmin={isAdmin} />
      </main>
    </div>
  );
}
