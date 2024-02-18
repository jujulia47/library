-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "library" BOOLEAN NOT NULL DEFAULT false,
    "finish" BOOLEAN NOT NULL DEFAULT false,
    "date" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "flags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookToFlagsArray" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToFlagsArray_A_fkey" FOREIGN KEY ("A") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToFlagsArray_B_fkey" FOREIGN KEY ("B") REFERENCES "flags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToFlagsArray_AB_unique" ON "_BookToFlagsArray"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToFlagsArray_B_index" ON "_BookToFlagsArray"("B");
