-- CreateTable
CREATE TABLE "FrontPage" (
    "pagePart" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "btnText" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "featuredImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    CONSTRAINT "featuredImage_parent_fkey" FOREIGN KEY ("parent") REFERENCES "FrontPage" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skills" (
    "pagePart" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "SkillItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    CONSTRAINT "SkillItem_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Skills" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievements" (
    "pagePart" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    CONSTRAINT "Review_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Achievements" ("pagePart") ON DELETE RESTRICT ON UPDATE CASCADE
);
