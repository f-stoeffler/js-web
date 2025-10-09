"use server";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeFeaturedImages = {
  featuredImages: true,
} satisfies Prisma.FrontPageInclude;

export const createFrontPage = async (
  frontPage: Prisma.FrontPageCreateInput
) => {
  return await prisma.frontPage.create({ data: frontPage });
};

export const getAllFrontPages = async () => {
  return await prisma.frontPage.findMany({
    include: includeFeaturedImages,
  });
};

export const getFrontPage = async (pagePart: string) => {
  return await prisma.frontPage.findUnique({
    where: { pagePart: pagePart },
    include: includeFeaturedImages,
  });
};

export const deleteFrontPage = async (pagePart: string) => {
  return await prisma.frontPage.delete({ where: { pagePart: pagePart } });
};
