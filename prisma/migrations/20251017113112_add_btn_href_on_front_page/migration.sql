-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FrontPage" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'FrontPage',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "btnText" TEXT NOT NULL,
    "btnHref" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FrontPage" ("btnText", "createdAt", "desc", "pagePart", "title", "updatedAt") SELECT "btnText", "createdAt", "desc", "pagePart", "title", "updatedAt" FROM "FrontPage";
DROP TABLE "FrontPage";
ALTER TABLE "new_FrontPage" RENAME TO "FrontPage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
