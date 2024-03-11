/*
  Warnings:

  - You are about to drop the `colections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "colections_colection_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "colections";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionName" TEXT,
    "created_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__CollectionArrayToWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CollectionArrayToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CollectionArrayToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CollectionArrayToWishlist" ("A", "B") SELECT "A", "B" FROM "_CollectionArrayToWishlist";
DROP TABLE "_CollectionArrayToWishlist";
ALTER TABLE "new__CollectionArrayToWishlist" RENAME TO "_CollectionArrayToWishlist";
CREATE UNIQUE INDEX "_CollectionArrayToWishlist_AB_unique" ON "_CollectionArrayToWishlist"("A", "B");
CREATE INDEX "_CollectionArrayToWishlist_B_index" ON "_CollectionArrayToWishlist"("B");
CREATE TABLE "new__BookToCollectionArray" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToCollectionArray_A_fkey" FOREIGN KEY ("A") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToCollectionArray_B_fkey" FOREIGN KEY ("B") REFERENCES "collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__BookToCollectionArray" ("A", "B") SELECT "A", "B" FROM "_BookToCollectionArray";
DROP TABLE "_BookToCollectionArray";
ALTER TABLE "new__BookToCollectionArray" RENAME TO "_BookToCollectionArray";
CREATE UNIQUE INDEX "_BookToCollectionArray_AB_unique" ON "_BookToCollectionArray"("A", "B");
CREATE INDEX "_BookToCollectionArray_B_index" ON "_BookToCollectionArray"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "collections_collectionName_key" ON "collections"("collectionName");
