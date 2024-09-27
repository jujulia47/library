/*
  Warnings:

  - A unique constraint covering the columns `[bookTitle]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishlist_bookTitle_key" ON "wishlist"("bookTitle");
