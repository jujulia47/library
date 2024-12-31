/*
  Warnings:

  - You are about to drop the column `finish` on the `books` table. All the data in the column will be lost.
  - You are about to alter the column `finishDate` on the `books` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `initDate` on the `books` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `abandoned` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `concluded` on the `series` table. All the data in the column will be lost.
  - Added the required column `pages` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collections" ADD COLUMN "comments" TEXT;
ALTER TABLE "collections" ADD COLUMN "finishDate" DATETIME;
ALTER TABLE "collections" ADD COLUMN "initDate" DATETIME;

-- CreateTable
CREATE TABLE "version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookVariation" TEXT,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "situation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookSituation" TEXT,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_FlagsArrayToSerie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FlagsArrayToSerie_A_fkey" FOREIGN KEY ("A") REFERENCES "flags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FlagsArrayToSerie_B_fkey" FOREIGN KEY ("B") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "situationId" TEXT,
    "rating" TEXT,
    "comments" TEXT,
    "pages" INTEGER NOT NULL,
    "versionId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "version" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title") SELECT "author", "category", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "author" TEXT NOT NULL,
    "rating" TEXT,
    "situationId" TEXT,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "series_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_series" ("created_at", "id", "serieName") SELECT "created_at", "id", "serieName" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
CREATE TABLE "new_wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookTitle" TEXT NOT NULL,
    "bookImage" TEXT,
    "link" TEXT NOT NULL,
    "seriesId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "wishlist_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_wishlist" ("bookImage", "bookTitle", "created_at", "id", "link") SELECT "bookImage", "bookTitle", "created_at", "id", "link" FROM "wishlist";
DROP TABLE "wishlist";
ALTER TABLE "new_wishlist" RENAME TO "wishlist";
CREATE UNIQUE INDEX "wishlist_bookTitle_key" ON "wishlist"("bookTitle");
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT,
    "quoteId" TEXT,
    "page" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_quotes" ("created_at", "id", "quote", "quoteId") SELECT "created_at", "id", "quote", "quoteId" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "version_bookVariation_key" ON "version"("bookVariation");

-- CreateIndex
CREATE UNIQUE INDEX "situation_bookSituation_key" ON "situation"("bookSituation");

-- CreateIndex
CREATE UNIQUE INDEX "_FlagsArrayToSerie_AB_unique" ON "_FlagsArrayToSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_FlagsArrayToSerie_B_index" ON "_FlagsArrayToSerie"("B");
