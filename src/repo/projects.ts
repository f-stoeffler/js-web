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

export const getProjects = async () => {
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

export const deleteProject = async (slug: string) => {
  return await prisma.project.delete({ where: { slug: slug } });
};

