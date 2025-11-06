-- CreateTable
CREATE TABLE "Header" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Header',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NavbarItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Header',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NavbarItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Header" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Footer" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Footer',
    "title" TEXT NOT NULL,
    "bottomText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FooterItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Header',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FooterItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Footer" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
