/*
  Warnings:

  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "person";

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
