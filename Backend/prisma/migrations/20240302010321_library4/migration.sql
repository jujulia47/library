-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_quotes" ("created_at", "id", "quote", "quoteId") SELECT "created_at", "id", "quote", "quoteId" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
