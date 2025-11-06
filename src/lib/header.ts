"use server";
import { withAdminAuth } from "./auth";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeNavbarItems = {
  navbarItems: true,
} satisfies Prisma.HeaderInclude;

export const createNavbarItem = withAdminAuth(
  async (navbarItem: Prisma.NavbarItemCreateInput
  ) => {
    return await prisma.navbarItem.create({ data: navbarItem });
  }
);

export const updateNavbarItem = withAdminAuth(
  async (id: number, navbarItem: Prisma.NavbarItemUpdateInput) => {
    return await prisma.navbarItem.update({ where: { id: id }, data: navbarItem });
  }
);

export const updateHeader = withAdminAuth(
  async (header: Prisma.HeaderUpdateInput) => {
    return await prisma.header.update({
      where: { pagePart: "Header" },
      data: header,
    });
  }
);

export const getHeaderWithoutNavbarItems = async () => {
  return await prisma.header.findUnique({
    where: { pagePart: "Header" },
  });
};

export const getHeader = async () => {
  return await prisma.header.findUnique({
    where: { pagePart: "Header" },
    include: includeNavbarItems,
  });
};

export const getNavbarItem = async (id: number) => {
  return await prisma.navbarItem.findUnique({
    where: { id: +id },
  });
};

export const deleteNavbarItem = withAdminAuth(async (id: number) => {
  return await prisma.navbarItem.delete({ where: { id: +id } });
});
