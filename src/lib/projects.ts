"use server";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";
import { checkIfUserIsAdmin } from "./auth";

const includeProjects = {
  projects: true,
} satisfies Prisma.ProjectsInclude;

const includeImages = {
  images: true,
} satisfies Prisma.ProjectInclude;

export const createProject = async (project: Prisma.ProjectCreateInput) => {
  return await prisma.project.create({ data: project });
};

export const createProjectImage = async (
  project: Prisma.ProjectImageCreateInput
) => {
  return await prisma.projectImage.create({ data: project });
};

export const updateProject = async (
  slug: string,
  project: Prisma.ProjectUpdateInput
) => {
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
};

export const getProjectsPage = async () => {
  return await prisma.projects.findMany({
    include: includeProjects,
  });
};

export const getProject = async (slug: string) => {
  return await prisma.project.findUnique({
    where: { slug: slug },
    include: includeImages,
  });
};

export const getProjectsPaginated = async (page: number, pageSize: number) => {
  const [allProjects, totalProjects] = await prisma.$transaction([
    prisma.project.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize + 1, // Fetch one extra item to check if there's a next page
      orderBy: {
        createdAt: "desc",
      },
      include: includeImages,
    }),
    prisma.project.count(),
  ]);
  return [allProjects, totalProjects];
};

export const getAllFeaturedProjects = async () => {
  return await prisma.project.findMany({
    where: { featured: true },
  });
};

export const deleteProject = async (slug: string) => {
  return await prisma.project.delete({ where: { slug: slug } });
};
