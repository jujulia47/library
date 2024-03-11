/*
  Warnings:

  - You are about to drop the `_BookToColectionArray` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColectionArrayToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookToColectionArray";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ColectionArrayToWishlist";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_BookToCollectionArray" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToCollectionArray_A_fkey" FOREIGN KEY ("A") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToCollectionArray_B_fkey" FOREIGN KEY ("B") REFERENCES "colections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CollectionArrayToWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CollectionArrayToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "colections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CollectionArrayToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCollectionArray_AB_unique" ON "_BookToCollectionArray"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCollectionArray_B_index" ON "_BookToCollectionArray"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionArrayToWishlist_AB_unique" ON "_CollectionArrayToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionArrayToWishlist_B_index" ON "_CollectionArrayToWishlist"("B");
