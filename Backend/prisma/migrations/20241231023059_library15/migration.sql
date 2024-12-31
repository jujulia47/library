/*
  Warnings:

  - You are about to drop the `situation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `situationId` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `situationId` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "situation_bookSituation_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "situation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookStatus" TEXT,
    "created_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "author" TEXT,
    "rating" TEXT,
    "statusId" TEXT,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "series_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_series" ("author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName") SELECT "author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "seriesId" TEXT,
    "author" TEXT,
    "category" TEXT,
    "language" TEXT,
    "library" BOOLEAN DEFAULT false,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "statusId" TEXT,
    "rating" TEXT,
    "comments" TEXT,
    "pages" INTEGER,
    "versionId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "version" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "title", "versionId") SELECT "author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "title", "versionId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "status_bookStatus_key" ON "status"("bookStatus");
