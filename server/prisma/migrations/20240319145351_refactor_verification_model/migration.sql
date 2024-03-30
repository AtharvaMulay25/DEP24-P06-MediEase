/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_key" ON "Verification"("email");
