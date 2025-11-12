"use server";
import { withAdminAuth } from "./auth";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeFeaturedImages = {
  featuredImages: true,
} satisfies Prisma.FrontPageInclude;

export const createFrontPage = withAdminAuth(async (
  frontPage: Prisma.FrontPageCreateInput
) => {
  return await prisma.frontPage.create({ data: frontPage });
})

export const updateFrontPage = withAdminAuth(async (
  frontPage: Prisma.FrontPageUpdateInput
) => {
  
  return await prisma.frontPage.update({
    where: { pagePart: "FrontPage" },
    data: frontPage,
  });
})

export const getAllFrontPages = async () => {
  return await prisma.frontPage.findMany({
    include: includeFeaturedImages,
  });
};

export const getFrontPage = async () => {
  return await prisma.frontPage.findUnique({
    where: { pagePart: "FrontPage" },
    include: includeFeaturedImages,
  });
};

export const deleteFrontPage = withAdminAuth(async (pagePart: string) => {
  return await prisma.frontPage.delete({ where: { pagePart: pagePart } });
})
