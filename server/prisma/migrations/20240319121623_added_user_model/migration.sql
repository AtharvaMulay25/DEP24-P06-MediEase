/*
  Warnings:

  - The `department` column on the `patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `program` column on the `patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `shiftSchedule` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the column `speciality` on the `staff` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('COMPUTER_SCIENCE', 'ELECTRICAL', 'MECHANICAL', 'MATHEMATICS_COMPUTING', 'CHEMICAL', 'CIVIL', 'METALLURGY', 'ENGINEERING_PHYSICS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'MATHEMATICS', 'HUMANITIES');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- CreateEnum
CREATE TYPE "Program" AS ENUM ('BTECH', 'MTECH', 'PHD', 'DUAL_DEGREE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DOCTOR', 'PATIENT', 'ADMIN', 'PARAMEDICAL');

-- CreateEnum
CREATE TYPE "DoctorDepartment" AS ENUM ('AYURVEDIC', 'GYNECOLOGY', 'HOMEOPATHY', 'OTHERS');

-- AlterTable
ALTER TABLE "checkup" ADD COLUMN     "pulseRate" INTEGER,
ADD COLUMN     "spO2" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "allergy" TEXT,
DROP COLUMN "department",
ADD COLUMN     "department" "Department",
ALTER COLUMN "dob" DROP NOT NULL,
DROP COLUMN "program",
ADD COLUMN     "program" "Program";

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "shiftSchedule",
DROP COLUMN "speciality",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "mobileNumber" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "shift" "Shift" NOT NULL,
    "day" "Day" NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
