/*
  Warnings:

  - You are about to drop the `book_flags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_flags";
PRAGMA foreign_keys=on;
