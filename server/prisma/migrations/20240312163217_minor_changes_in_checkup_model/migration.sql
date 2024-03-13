/*
  Warnings:

  - You are about to drop the column `diseaseOrCause` on the `checkup` table. All the data in the column will be lost.
  - Added the required column `diagnosis` to the `checkup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkup" DROP COLUMN "diseaseOrCause",
ADD COLUMN     "diagnosis" TEXT NOT NULL;
