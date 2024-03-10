/*
  Warnings:

  - The values [PHARMACIST,NURSE,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `amount` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `netQuantity` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `batchNo` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineId` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseListId` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `stock` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PatientCategory" AS ENUM ('STUDENT', 'FACULTY', 'STAFF', 'VISITOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('DOCTOR', 'PARAMEDICAL');
ALTER TABLE "staff" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_medicineId_fkey";

-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "amount",
DROP COLUMN "purchaseDate",
DROP COLUMN "supplierId",
ADD COLUMN     "batchNo" BIGINT NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "medicineId" TEXT NOT NULL,
ADD COLUMN     "mfgDate" TIMESTAMP(3),
ADD COLUMN     "purchaseListId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "category",
DROP COLUMN "netQuantity",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Medicine";

-- DropTable
DROP TABLE "Supplier";

-- CreateTable
CREATE TABLE "medicine" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "saltName" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT NOT NULL,
    "pinCode" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseList" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "Details" TEXT,

    CONSTRAINT "purchaseList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "strengthType" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "program" TEXT,
    "fatherOrSpouseName" TEXT,
    "category" "PatientCategory" NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkup" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "bloodPressure" TEXT,
    "symptoms" TEXT,
    "diseaseOrCause" TEXT NOT NULL,
    "doctorId" TEXT,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "checkup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CheckupMedicines" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "purchaseList_invoiceNo_key" ON "purchaseList"("invoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CheckupMedicines_AB_unique" ON "_CheckupMedicines"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckupMedicines_B_index" ON "_CheckupMedicines"("B");

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseList" ADD CONSTRAINT "purchaseList_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_purchaseListId_fkey" FOREIGN KEY ("purchaseListId") REFERENCES "purchaseList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkup" ADD CONSTRAINT "checkup_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkup" ADD CONSTRAINT "checkup_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkup" ADD CONSTRAINT "checkup_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckupMedicines" ADD CONSTRAINT "_CheckupMedicines_A_fkey" FOREIGN KEY ("A") REFERENCES "checkup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckupMedicines" ADD CONSTRAINT "_CheckupMedicines_B_fkey" FOREIGN KEY ("B") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
