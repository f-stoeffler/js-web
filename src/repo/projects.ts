"use server";
import prisma from "./prismaclient";
import { Prisma } from "../../generated/prisma";
import { FrontPage } from "../../generated/prisma";

const includeProjects = {
  projects: true,
} satisfies Prisma.ProjectsInclude;

const includeImages = {
  images: true
} satisfies Prisma.ProjectInclude

export const createProject = async (
  project: Prisma.ProjectCreateInput
) => {
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
  return await prisma.project.update({
    where: { slug: slug },
    data: project
  });
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
  return await prisma.project.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize+1, // Fetch one extra item to check if there's a next page
    orderBy: {
      createdAt: 'desc',
    },
    include: includeImages,
  });
};

export const getAllFeaturedProjects = async () => {
  return await prisma.project.findMany({
    where: {featured: true}
  });
};

export const deleteProject = async (slug: string) => {
  return await prisma.project.delete({ where: { slug: slug } });
};

