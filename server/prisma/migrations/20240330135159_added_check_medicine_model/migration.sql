-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('OD', 'BD', 'SOS', 'TDS');

-- CreateTable
CREATE TABLE "checkupMedicine" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "dosage" TEXT,
    "frequency" "Frequency" NOT NULL,
    "checkupId" TEXT NOT NULL,

    CONSTRAINT "checkupMedicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkupMedicine" ADD CONSTRAINT "checkupMedicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkupMedicine" ADD CONSTRAINT "checkupMedicine_checkupId_fkey" FOREIGN KEY ("checkupId") REFERENCES "checkup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
