/*
  Warnings:

  - Added the required column `updatedAt` to the `Achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FrontPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SkillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `featuredImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Achievements" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Achievements',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Achievements" ("desc", "pagePart", "title") SELECT "desc", "pagePart", "title" FROM "Achievements";
DROP TABLE "Achievements";
ALTER TABLE "new_Achievements" RENAME TO "Achievements";
CREATE TABLE "new_FrontPage" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'FrontPage',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "btnText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FrontPage" ("btnText", "desc", "pagePart", "title") SELECT "btnText", "desc", "pagePart", "title" FROM "FrontPage";
DROP TABLE "FrontPage";
ALTER TABLE "new_FrontPage" RENAME TO "FrontPage";
CREATE TABLE "new_Project" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "featured" BOOLEAN NOT NULL,
    "mainImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Projects',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Projects" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("desc", "featured", "mainImage", "parent", "shortDesc", "slug", "title") SELECT "desc", "featured", "mainImage", "parent", "shortDesc", "slug", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_ProjectImage" (
    "id" INTEGER NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("parentSlug", "id"),
    CONSTRAINT "ProjectImage_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "Project" ("slug") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectImage" ("id", "imgPath", "parentSlug") SELECT "id", "imgPath", "parentSlug" FROM "ProjectImage";
DROP TABLE "ProjectImage";
ALTER TABLE "new_ProjectImage" RENAME TO "ProjectImage";
CREATE TABLE "new_Projects" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Projects',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Projects" ("desc", "pagePart", "title") SELECT "desc", "pagePart", "title" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Achievements',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Achievements" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("desc", "id", "parent", "title") SELECT "desc", "id", "parent", "title" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_SkillItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Skills',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SkillItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Skills" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SkillItem" ("desc", "id", "parent", "title") SELECT "desc", "id", "parent", "title" FROM "SkillItem";
DROP TABLE "SkillItem";
ALTER TABLE "new_SkillItem" RENAME TO "SkillItem";
CREATE TABLE "new_Skills" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Skills',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Skills" ("pagePart") SELECT "pagePart" FROM "Skills";
DROP TABLE "Skills";
ALTER TABLE "new_Skills" RENAME TO "Skills";
CREATE TABLE "new_featuredImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'FrontPage',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "featuredImage_parent_fkey" FOREIGN KEY ("parent") REFERENCES "FrontPage" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_featuredImage" ("desc", "id", "imgPath", "parent", "title") SELECT "desc", "id", "imgPath", "parent", "title" FROM "featuredImage";
DROP TABLE "featuredImage";
ALTER TABLE "new_featuredImage" RENAME TO "featuredImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
