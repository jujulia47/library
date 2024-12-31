-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_situation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookSituation" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_situation" ("bookSituation", "created_at", "id") SELECT "bookSituation", "created_at", "id" FROM "situation";
DROP TABLE "situation";
ALTER TABLE "new_situation" RENAME TO "situation";
CREATE UNIQUE INDEX "situation_bookSituation_key" ON "situation"("bookSituation");
CREATE TABLE "new_wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookTitle" TEXT NOT NULL,
    "bookImage" TEXT,
    "link" TEXT,
    "seriesId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "wishlist_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_wishlist" ("bookImage", "bookTitle", "created_at", "id", "link", "seriesId") SELECT "bookImage", "bookTitle", "created_at", "id", "link", "seriesId" FROM "wishlist";
DROP TABLE "wishlist";
ALTER TABLE "new_wishlist" RENAME TO "wishlist";
CREATE UNIQUE INDEX "wishlist_bookTitle_key" ON "wishlist"("bookTitle");
CREATE TABLE "new_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieName" TEXT,
    "author" TEXT,
    "rating" TEXT,
    "situationId" TEXT,
    "initDate" DATETIME,
    "finishDate" DATETIME,
    "comments" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "series_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_series" ("author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "situationId") SELECT "author", "comments", "created_at", "finishDate", "id", "initDate", "rating", "serieName", "situationId" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT,
    "quoteId" TEXT,
    "page" INTEGER,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_quotes" ("created_at", "id", "page", "quote", "quoteId") SELECT "created_at", "id", "page", "quote", "quoteId" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");
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
    "situationId" TEXT,
    "rating" TEXT,
    "comments" TEXT,
    "pages" INTEGER,
    "versionId" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "books_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "version" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "situationId", "title", "versionId") SELECT "author", "category", "comments", "created_at", "finishDate", "id", "image", "initDate", "language", "library", "pages", "rating", "seriesId", "situationId", "title", "versionId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
