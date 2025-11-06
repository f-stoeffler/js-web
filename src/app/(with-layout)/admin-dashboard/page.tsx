"use server";

import CreateProjectComp from "@/comps/admin-dashboard/CreateProject";
import EditFooter from "@/comps/admin-dashboard/EditFooter";
import EditFooterItems from "@/comps/admin-dashboard/EditFooterItems";
import EditFrontPage from "@/comps/admin-dashboard/EditFrontPage";
import EditNavbarItems from "@/comps/admin-dashboard/EditNavbarItems";
import EditProjectsSection from "@/comps/admin-dashboard/EditProjectsSection";
import EditReviews from "@/comps/admin-dashboard/EditReviews";
import EditReviewsSection from "@/comps/admin-dashboard/EditReviewsSection";
import EditSkillsSection from "@/comps/admin-dashboard/EditSkillsSection";
import ProjectsComp from "@/comps/homepage/Projects";
import { checkIfUserIsAdmin } from "@/lib/auth";
import { getFooter } from "@/lib/footer";
import { getFrontPage } from "@/lib/frontPage";
import { getHeader } from "@/lib/header";
import { getProjectsPageWithoutProjects } from "@/lib/projects";
import { getReviews, getReviewsSectionWithoutReviews } from "@/lib/reviews";
import { getSkills } from "@/lib/skills";
import { SkillItem, Skills } from "@prisma/client";

export default async function AdminDashboard() {
  const isAdmin = await checkIfUserIsAdmin();

  const frontPage = await getFrontPage();
  const reviewsSectionWithoutReviews = await getReviewsSectionWithoutReviews();
  const projectsPagePart = await getProjectsPageWithoutProjects();
  const skillsPagePart:
    | ({
        skillItems: SkillItem[];
      } & Skills)
    | null = await getSkills();
  const reviewsSection = await getReviews();
  const reviews = reviewsSection?.reviews;
  const footer = await getFooter();
  const header = await getHeader();

  return (
    <div className="md:container mx-auto mt-6">
      <div className="mb-3 gap-1.5 flex flex-col">
        <h3 className="font-bold text-lg mb-1.5">Hinweise zum angeben von Links</h3>
        <p>Sprunglinks: /#info-cards - /#reviews - /#projects</p>
        <p>Alle Links die auf diese Seite verweisen können nur mit / zu beginn angeschrieben werden. Z.B. statt &quot;https://showtech-stoeffler.at/project/my-project&quot; muss nur &quot;/project/my-project&quot; als Link angegeben werden.</p>
        <p>Externe Seiten müssen mit der ganzen Adresse (inklusive https://) angegeben werden. Beispielsweise wird nur &quot;google.com&quot; nicht funktionieren, es muss &quot;https://google.com&quot; angegeben werden. Für externe Seiten ist es am besten die Seite zu öffnen und die URL einfach aus der URL-Leiste zu kopieren.</p>
      </div>
      <div className="grid grid-cols-12  gap-4 mb-8">
        {frontPage && <EditFrontPage data={frontPage} className="col-span-12 xl:col-span-6" />}
        {skillsPagePart && (
          <EditSkillsSection data={skillsPagePart} className="col-span-12 lg:col-span-8 xl:col-span-6" />
        )}
        {reviewsSectionWithoutReviews && (
          <EditReviewsSection
            data={reviewsSectionWithoutReviews}
            className="col-span-12 lg:col-span-4 xl:col-span-3"
          />
        )}
        <EditReviews data={reviews} className="col-span-12 lg:col-span-8 xl:col-span-9" />
        {footer && <EditFooter data={footer} className="col-span-12 lg:col-span-4 xl:col-span-3" />}
        <EditFooterItems data={footer?.footerItems} className="col-span-12 xl:col-span-9" />
        <EditNavbarItems data={header?.navbarItems} className="col-span-12 2xl:col-span-6 3xl:col-span-7" />
        {projectsPagePart && (
          <EditProjectsSection data={projectsPagePart} className="col-span-12 lg:col-span-8 2xl:col-span-3" />
        )}
        <CreateProjectComp className="col-span-12 lg:col-span-4 2xl:col-span-3 3xl:col-span-2" />
      </div>
      <main className="my-4">
        <ProjectsComp isAdmin={isAdmin} />
      </main>
    </div>
  );
}
