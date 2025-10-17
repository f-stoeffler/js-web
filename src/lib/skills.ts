"use server";
import { withAdminAuth } from "./auth";
import prisma from "./prismaclient";
import { Prisma, SkillItem } from "@prisma/client";

const includeskillItems = {
  skillItems: true,
} satisfies Prisma.SkillsInclude;

export const createSkillItem = withAdminAuth(
  async (skillItem: Prisma.SkillItemCreateInput) => {
    return await prisma.skillItem.create({ data: skillItem });
  }
);
export const updateSkillItem = withAdminAuth(
  async (id: number, skillItem: Prisma.SkillItemCreateInput) => {
    return await prisma.skillItem.update({
      where: { id: id },
      data: skillItem,
    });
  }
);

export const getSkills = async () => {
  return await prisma.skills.findUnique({
    where: { pagePart: "Skills" },
    include: includeskillItems,
  });
};

export const getSkillItem = async (id: number) => {
  return await prisma.skillItem.findUnique({
    where: { id: +id },
  });
};

export const deleteSkillItem = withAdminAuth(async (id: number) => {
  return await prisma.skillItem.delete({ where: { id: +id } });
});
