/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `ProjectImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parentId` on the `ProjectImage` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentSlug` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "featured" BOOLEAN NOT NULL,
    "mainImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Projects',
    CONSTRAINT "Project_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Projects" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("desc", "featured", "mainImage", "parent", "shortDesc", "title") SELECT "desc", "featured", "mainImage", "parent", "shortDesc", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_ProjectImage" (
    "id" INTEGER NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,

    PRIMARY KEY ("parentSlug", "id"),
    CONSTRAINT "ProjectImage_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "Project" ("slug") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectImage" ("id", "imgPath") SELECT "id", "imgPath" FROM "ProjectImage";
DROP TABLE "ProjectImage";
ALTER TABLE "new_ProjectImage" RENAME TO "ProjectImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
