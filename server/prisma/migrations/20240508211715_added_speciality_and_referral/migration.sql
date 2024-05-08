-- DropIndex
DROP INDEX "supplier_mobileNumber_key";

-- AlterTable
ALTER TABLE "checkup" ADD COLUMN     "referredDoctor" TEXT,
ADD COLUMN     "referredHospital" TEXT;

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "speciality" TEXT;
