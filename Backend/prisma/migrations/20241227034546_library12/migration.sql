/*
  Warnings:

  - You are about to drop the column `bookVariation` on the `version` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookVersion" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_version" ("created_at", "id") SELECT "created_at", "id" FROM "version";
DROP TABLE "version";
ALTER TABLE "new_version" RENAME TO "version";
CREATE UNIQUE INDEX "version_bookVersion_key" ON "version"("bookVersion");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
