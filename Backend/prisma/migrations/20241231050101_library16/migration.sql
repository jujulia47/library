-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "seriesId" TEXT,
    "author" TEXT,
    "category" TEXT,
    "language" TEXT,
    "library" BOOLEAN DEFAULT false,
    "initDate" TEXT,
    "finishDate" TEXT,
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
INSERT INTO "new_books" ("author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "statusId", "title", "versionId") SELECT "author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "statusId", "title", "versionId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
CREATE TABLE "new_collections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionName" TEXT,
    "initDate" TEXT,
    "finishDate" TEXT,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_collections" ("collectionName", "comments", "created_at", "finishDate", "id", "initDate") SELECT "collectionName", "comments", "created_at", "finishDate", "id", "initDate" FROM "collections";
DROP TABLE "collections";
ALTER TABLE "new_collections" RENAME TO "collections";
CREATE UNIQUE INDEX "collections_collectionName_key" ON "collections"("collectionName");
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "author" TEXT,
    "rating" TEXT,
    "statusId" TEXT,
    "initDate" TEXT,
    "finishDate" TEXT,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "series_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_series" ("author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "statusId") SELECT "author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "statusId" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
