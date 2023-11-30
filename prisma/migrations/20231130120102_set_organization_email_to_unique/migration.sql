/*
  Warnings:

  - The values [XS,XL] on the enum `PetSize` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetSize_new" AS ENUM ('SM', 'MD', 'LG');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "PetSize_new" USING ("size"::text::"PetSize_new");
ALTER TYPE "PetSize" RENAME TO "PetSize_old";
ALTER TYPE "PetSize_new" RENAME TO "PetSize";
DROP TYPE "PetSize_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
