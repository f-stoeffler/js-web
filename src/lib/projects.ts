"use server";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";
import { checkIfUserIsAdmin, withAdminAuth } from "./auth";
import path from "path";
import { rm } from "fs/promises";

const includeProjects = async () => {
  const isAdmin = await checkIfUserIsAdmin();
  const whereCondition = isAdmin ? true : { where: { public: true } };
  return {
    projects: whereCondition,
  } satisfies Prisma.ProjectsInclude;
};

const includeImages = {
  images: true,
} satisfies Prisma.ProjectInclude;

export const createProject = withAdminAuth(
  async (project: Prisma.ProjectCreateInput) => {
    try {
      const isAdmin = await checkIfUserIsAdmin();

      if (!isAdmin) {
        throw new Error("Unauthorized");
      }
      const newProject = await prisma.project.create({ data: project });

      return { success: true, project: newProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error: "Failed to update project: " + error };
    }
  }
);

export const createProjectImage = withAdminAuth(
  async (project: Prisma.ProjectImageCreateInput) => {
    return await prisma.projectImage.create({ data: project });
  }
);

export const updateProject = withAdminAuth(
  async (slug: string, project: Prisma.ProjectUpdateInput) => {
    try {
      const isAdmin = await checkIfUserIsAdmin();

      if (!isAdmin) {
        throw new Error("Unauthorized");
      }

      const updatedProject = await prisma.project.update({
        where: { slug },
        data: project,
      });

      return { success: true, project: updatedProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error: "Failed to update project" };
    }
  }
);
export const updateProjectsPagePart = withAdminAuth(
  async (projects: Prisma.ProjectsUpdateInput) => {
    try {
      const updatedProject = await prisma.projects.update({
        where: { pagePart: "Projects" },
        data: projects,
      });

      return { success: true, project: updatedProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error: "Failed to update project" };
    }
  }
);

export const updateProjectWithImages = withAdminAuth(
  async (slug: string, project: Prisma.ProjectUpdateInput) => {
    try {
      const isAdmin = await checkIfUserIsAdmin();
      if (!isAdmin) {
        throw new Error("Unauthorized");
      }

      const updatedProject = await prisma.project.update({
        where: { slug },
        data: {
          ...project,
        },
        include: includeImages,
      });

      return { success: true, project: updatedProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { success: false, error: "Failed to update project" };
    }
  }
);

export const getProjectsPage = async () => {
  return await prisma.projects.findMany({
    include: await includeProjects(),
  });
};

export const getProjectsPageWithoutProjects = async () => {
  return await prisma.projects.findUnique({ where: { pagePart: "Projects" } });
};

export const getProject = async (slug: string) => {
  const isAdmin = await checkIfUserIsAdmin();

  const project = await prisma.project.findUnique({
    where: { slug: slug },
    include: includeImages,
  });

  if (project?.public === false && isAdmin === false) {
    return undefined;
  } else {
    return project;
  }
};

export const getProjectsPaginated = async (page: number, pageSize: number) => {
  const isAdmin = await checkIfUserIsAdmin();
  const whereCondition = isAdmin ? {} : { public: true };
  const [allProjects, totalProjects] = await prisma.$transaction([
    prisma.project.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize + 1, // Fetch one extra item to check if there's a next page
      orderBy: {
        createdAt: "desc",
      },
      include: includeImages,
    }),
    prisma.project.count({ where: whereCondition }),
  ]);
  return [allProjects, totalProjects];
};

export const getAllFeaturedProjects = async () => {
  const isAdmin = await checkIfUserIsAdmin();
  const whereCondition = isAdmin
    ? { featured: true }
    : { public: true, featured: true };
  return await prisma.project.findMany({
    where: whereCondition,
  });
};

export const deleteProject = withAdminAuth(async (slug: string) => {
  const deletedProject = await prisma.project.delete({ where: { slug: slug } });
  if (deletedProject) {
    const uploadsBaseDir =
      process.env.UPLOADS_DIR || path.join(process.cwd(), "uploads");
    const projectDir = path.join(uploadsBaseDir, slug);
    await rm(projectDir, { recursive: true, force: true });
  }
  return deletedProject;
});

export const getAllProjectImages = async (slug: string) => {
  return await prisma.projectImage.findMany({
    where: { parentSlug: slug },
  });
};
