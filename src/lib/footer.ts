"use server";
import { withAdminAuth } from "./auth";
import prisma from "./prismaclient";
import { Prisma } from "@prisma/client";

const includeFooterItems = {
  footerItems: true,
} satisfies Prisma.FooterInclude;

export const createFooterItem = withAdminAuth(
  async (footerItem: Prisma.FooterItemCreateInput) => {
    return await prisma.footerItem.create({ data: footerItem });
  }
);

export const updateFooterItem = withAdminAuth(
  async (id: number, footerItem: Prisma.FooterItemUpdateInput) => {
    return await prisma.footerItem.update({ where: { id: id }, data: footerItem });
  }
);

export const updateFooter = withAdminAuth(
  async (footer: Prisma.FooterUpdateInput) => {
    return await prisma.footer.update({
      where: { pagePart: "Footer" },
      data: footer,
    });
  }
);

export const getFooterWithoutItems = async () => {
  return await prisma.footer.findUnique({
    where: { pagePart: "Footer" },
  });
};

export const getFooter = async () => {
  return await prisma.footer.findUnique({
    where: { pagePart: "Footer" },
    include: includeFooterItems,
  });
};

export const getFooterItem = async (id: number) => {
  return await prisma.footerItem.findUnique({
    where: { id: +id },
  });
};

export const deleteFooterItem = withAdminAuth(async (id: number) => {
  return await prisma.footerItem.delete({ where: { id: +id } });
});
