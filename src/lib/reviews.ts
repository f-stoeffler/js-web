"use server";
import { withAdminAuth } from "./auth";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeReviews = {
  reviews: true,
} satisfies Prisma.AchievementsInclude;

export const createReview = withAdminAuth(
  async (review: Prisma.ReviewCreateInput) => {
    return await prisma.review.create({ data: review });
  }
);

export const updateReview = withAdminAuth(
  async (id: number, review: Prisma.ReviewUpdateInput) => {
    return await prisma.review.update({ where: { id: id }, data: review });
  }
);

export const updateReviewsSection = withAdminAuth(
  async (revSection: Prisma.AchievementsUpdateInput) => {
    return await prisma.achievements.update({
      where: { pagePart: "Achievements" },
      data: revSection,
    });
  }
);

export const getReviewsSectionWithoutReviews = async () => {
  return await prisma.achievements.findUnique({
    where: { pagePart: "Achievements" },
  });
};

export const getReviews = async () => {
  return await prisma.achievements.findUnique({
    where: { pagePart: "Achievements" },
    include: includeReviews,
  });
};

export const getReview = async (id: number) => {
  return await prisma.review.findUnique({
    where: { id: +id },
  });
};

export const deleteReview = withAdminAuth(async (id: number) => {
  return await prisma.review.delete({ where: { id: +id } });
});
