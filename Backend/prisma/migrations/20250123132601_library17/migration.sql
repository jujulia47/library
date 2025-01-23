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
    "pages" TEXT,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
