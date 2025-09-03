-- CreateTable
CREATE TABLE "Projects" (
    "pagePart" TEXT NOT NULL PRIMARY KEY DEFAULT 'Projects',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "featured" BOOLEAN NOT NULL,
    "mainImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'Projects',
    CONSTRAINT "Project_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Projects" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imgPath" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,
    CONSTRAINT "ProjectImage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
