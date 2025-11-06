-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FooterItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Footer',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FooterItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Footer" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FooterItem" ("createdAt", "id", "parent", "text", "updatedAt", "url") SELECT "createdAt", "id", "parent", "text", "updatedAt", "url" FROM "FooterItem";
DROP TABLE "FooterItem";
ALTER TABLE "new_FooterItem" RENAME TO "FooterItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
