/*
  Warnings:

  - The `pinCode` column on the `supplier` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `invoiceNo` on the `purchaseList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "purchaseList" DROP COLUMN "invoiceNo",
ADD COLUMN     "invoiceNo" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "pinCode",
ADD COLUMN     "pinCode" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "purchaseList_invoiceNo_key" ON "purchaseList"("invoiceNo");
