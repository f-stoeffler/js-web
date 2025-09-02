-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Achievements" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Achievements',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);
INSERT INTO "new_Achievements" ("desc", "pagePart", "title") SELECT "desc", "pagePart", "title" FROM "Achievements";
DROP TABLE "Achievements";
ALTER TABLE "new_Achievements" RENAME TO "Achievements";
CREATE TABLE "new_FrontPage" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'FrontPage',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "btnText" TEXT NOT NULL
);
INSERT INTO "new_FrontPage" ("btnText", "desc", "pagePart", "title") SELECT "btnText", "desc", "pagePart", "title" FROM "FrontPage";
DROP TABLE "FrontPage";
ALTER TABLE "new_FrontPage" RENAME TO "FrontPage";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Achievements',
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
    CONSTRAINT "SkillItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Skills" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SkillItem" ("desc", "id", "parent", "title") SELECT "desc", "id", "parent", "title" FROM "SkillItem";
DROP TABLE "SkillItem";
ALTER TABLE "new_SkillItem" RENAME TO "SkillItem";
CREATE TABLE "new_Skills" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Skills'
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
    CONSTRAINT "featuredImage_parent_fkey" FOREIGN KEY ("parent") REFERENCES "FrontPage" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_featuredImage" ("desc", "id", "imgPath", "parent", "title") SELECT "desc", "id", "imgPath", "parent", "title" FROM "featuredImage";
DROP TABLE "featuredImage";
ALTER TABLE "new_featuredImage" RENAME TO "featuredImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
