"use server";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeReviews = {
  reviews: true,
} satisfies Prisma.AchievementsInclude;

export const createReview = async (
  review: Prisma.ReviewCreateInput
) => {
  return await prisma.review.create({ data: review });
};


export const getAchievements = async (pagePart: string) => {
  return await prisma.achievements.findUnique({
    where: { pagePart: pagePart },
    include: includeReviews,
  });
};

export const getReview = async (id: number) => {
  return await prisma.review.findUnique({
    where: { id: +id }
  });
};

export const deleteReview = async (id: number) => {
  return await prisma.review.delete({ where: { id: +id } });
};
