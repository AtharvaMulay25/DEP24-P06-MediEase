/*
  Warnings:

  - You are about to drop the column `frequency` on the `checkupMedicine` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `checkupMedicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkupMedicine" DROP COLUMN "frequency",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Frequency";
