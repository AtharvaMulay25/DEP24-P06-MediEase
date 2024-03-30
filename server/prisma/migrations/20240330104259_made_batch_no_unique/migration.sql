/*
  Warnings:

  - A unique constraint covering the columns `[batchNo]` on the table `purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "purchase_batchNo_key" ON "purchase"("batchNo");
