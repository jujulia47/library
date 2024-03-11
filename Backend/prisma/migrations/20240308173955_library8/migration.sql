-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_flags" ("created_at", "flag", "id") SELECT "created_at", "flag", "id" FROM "flags";
DROP TABLE "flags";
ALTER TABLE "new_flags" RENAME TO "flags";
CREATE UNIQUE INDEX "flags_flag_key" ON "flags"("flag");
CREATE TABLE "new_wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookTitle" TEXT NOT NULL,
    "bookImage" TEXT,
    "link" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_wishlist" ("bookImage", "bookTitle", "created_at", "id", "link") SELECT "bookImage", "bookTitle", "created_at", "id", "link" FROM "wishlist";
DROP TABLE "wishlist";
ALTER TABLE "new_wishlist" RENAME TO "wishlist";
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT,
    "quoteId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_quotes" ("created_at", "id", "quote", "quoteId") SELECT "created_at", "id", "quote", "quoteId" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");
CREATE TABLE "new_colections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "colection" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_colections" ("colection", "created_at", "id") SELECT "colection", "created_at", "id" FROM "colections";
DROP TABLE "colections";
ALTER TABLE "new_colections" RENAME TO "colections";
CREATE UNIQUE INDEX "colections_colection_key" ON "colections"("colection");
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "seriesId" TEXT,
    "author" TEXT NOT NULL,
    "category" TEXT,
    "language" TEXT NOT NULL,
    "library" BOOLEAN NOT NULL DEFAULT false,
    "initDate" TEXT,
    "finishDate" TEXT,
    "finish" BOOLEAN NOT NULL DEFAULT false,
    "rating" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "created_at", "finish", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title") SELECT "author", "category", "created_at", "finish", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "concluded" BOOLEAN DEFAULT false,
    "abandoned" BOOLEAN DEFAULT false,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_series" ("abandoned", "concluded", "created_at", "id", "serieName") SELECT "abandoned", "concluded", "created_at", "id", "serieName" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
