/*
  Warnings:

  - You are about to drop the `_CheckupMedicines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CheckupMedicines" DROP CONSTRAINT "_CheckupMedicines_A_fkey";

-- DropForeignKey
ALTER TABLE "_CheckupMedicines" DROP CONSTRAINT "_CheckupMedicines_B_fkey";

-- DropTable
DROP TABLE "_CheckupMedicines";
