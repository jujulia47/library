/*
  Warnings:

  - Made the column `bookSituation` on table `situation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `situationId` on table `series` required. This step will fail if there are existing NULL values in that column.
  - Made the column `situationId` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `versionId` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_situation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookSituation" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_situation" ("bookSituation", "created_at", "id") SELECT "bookSituation", "created_at", "id" FROM "situation";
DROP TABLE "situation";
ALTER TABLE "new_situation" RENAME TO "situation";
CREATE UNIQUE INDEX "situation_bookSituation_key" ON "situation"("bookSituation");
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "author" TEXT NOT NULL,
    "rating" TEXT,
    "situationId" TEXT NOT NULL,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "series_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_series" ("author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "situationId") SELECT "author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "situationId" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "seriesId" TEXT,
    "author" TEXT NOT NULL,
    "category" TEXT,
    "language" TEXT NOT NULL,
    "library" BOOLEAN NOT NULL DEFAULT false,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "situationId" TEXT NOT NULL,
    "rating" TEXT,
    "comments" TEXT,
    "pages" INTEGER NOT NULL,
    "versionId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "books_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "version" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "situationId", "title", "versionId") SELECT "author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "situationId", "title", "versionId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
