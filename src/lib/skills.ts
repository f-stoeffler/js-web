"use server";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeskillItems = {
  skillItems: true,
} satisfies Prisma.SkillsInclude;

export const createSkillItem = async (
  skillItem: Prisma.SkillItemCreateInput
) => {
  return await prisma.skillItem.create({ data: skillItem });
};


export const getSkills = async (pagePart: string) => {
  return await prisma.skills.findUnique({
    where: { pagePart: pagePart },
    include: includeskillItems,
  });
};

export const getSkillItem = async (id: number) => {
  return await prisma.skillItem.findUnique({
    where: { id: +id }
  });
};

export const deleteSkillItem = async (id: number) => {
  return await prisma.skillItem.delete({ where: { id: +id } });
};
