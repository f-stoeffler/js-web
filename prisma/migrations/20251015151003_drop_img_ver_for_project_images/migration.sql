/*
  Warnings:

  - You are about to drop the column `imgVer` on the `ProjectImage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectImage" (
    "id" INTEGER NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT 'Kein Alttext',
    "imgPath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("parentSlug", "id"),
    CONSTRAINT "ProjectImage_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "Project" ("slug") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectImage" ("altText", "createdAt", "id", "imgPath", "parentSlug", "updatedAt") SELECT "altText", "createdAt", "id", "imgPath", "parentSlug", "updatedAt" FROM "ProjectImage";
DROP TABLE "ProjectImage";
ALTER TABLE "new_ProjectImage" RENAME TO "ProjectImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
