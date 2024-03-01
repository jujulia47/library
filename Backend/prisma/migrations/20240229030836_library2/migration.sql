/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[colection]` on the table `colections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flag]` on the table `flags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quote]` on the table `quotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serieName]` on the table `series` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");

-- CreateIndex
CREATE UNIQUE INDEX "colections_colection_key" ON "colections"("colection");

-- CreateIndex
CREATE UNIQUE INDEX "flags_flag_key" ON "flags"("flag");

-- CreateIndex
CREATE UNIQUE INDEX "quotes_quote_key" ON "quotes"("quote");

-- CreateIndex
CREATE UNIQUE INDEX "series_serieName_key" ON "series"("serieName");
