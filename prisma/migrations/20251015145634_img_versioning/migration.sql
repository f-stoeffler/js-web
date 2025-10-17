-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "featured" BOOLEAN NOT NULL,
    "mainImage" TEXT NOT NULL,
    "mainImageVer" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Projects',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Projects" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "desc", "featured", "mainImage", "parent", "shortDesc", "slug", "title", "updatedAt") SELECT "createdAt", "desc", "featured", "mainImage", "parent", "shortDesc", "slug", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_ProjectImage" (
    "id" INTEGER NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT 'Kein Alttext',
    "imgPath" TEXT NOT NULL,
    "imgVer" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
