-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "mainImage" TEXT NOT NULL DEFAULT '',
    "mainImageVer" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT 'Keine Beschreibung',
    "parent" TEXT NOT NULL DEFAULT 'Projects',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Projects" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "desc", "featured", "mainImage", "mainImageVer", "parent", "public", "shortDesc", "slug", "title", "updatedAt") SELECT "createdAt", "desc", "featured", "mainImage", "mainImageVer", "parent", "public", "shortDesc", "slug", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
