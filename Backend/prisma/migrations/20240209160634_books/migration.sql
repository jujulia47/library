/*
  Warnings:

  - You are about to drop the column `bookId` on the `flags` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "book_flags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "flagId" TEXT NOT NULL,
    CONSTRAINT "book_flags_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_flags_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "flags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookToFlagsArray" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToFlagsArray_A_fkey" FOREIGN KEY ("A") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToFlagsArray_B_fkey" FOREIGN KEY ("B") REFERENCES "flags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_flags" ("created_at", "flag", "id") SELECT "created_at", "flag", "id" FROM "flags";
DROP TABLE "flags";
ALTER TABLE "new_flags" RENAME TO "flags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BookToFlagsArray_AB_unique" ON "_BookToFlagsArray"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToFlagsArray_B_index" ON "_BookToFlagsArray"("B");
