-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "seriesId" TEXT,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "library" BOOLEAN NOT NULL DEFAULT false,
    "initDate" TEXT NOT NULL,
    "finishDate" TEXT NOT NULL,
    "finish" BOOLEAN NOT NULL DEFAULT false,
    "rating" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category", "created_at", "finish", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title") SELECT "author", "category", "created_at", "finish", "finishDate", "id", "image", "initDate", "language", "library", "rating", "seriesId", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
