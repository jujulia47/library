-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookTitle" TEXT NOT NULL,
    "bookImage" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ColectionArrayToWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ColectionArrayToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "colections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColectionArrayToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColectionArrayToWishlist_AB_unique" ON "_ColectionArrayToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ColectionArrayToWishlist_B_index" ON "_ColectionArrayToWishlist"("B");
