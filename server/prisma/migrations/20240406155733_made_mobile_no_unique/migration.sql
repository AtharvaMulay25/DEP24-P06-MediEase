/*
  Warnings:

  - A unique constraint covering the columns `[mobileNumber]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "supplier_mobileNumber_key" ON "supplier"("mobileNumber");
