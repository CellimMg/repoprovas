/*
  Warnings:

  - You are about to drop the column `name` on the `terms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `terms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `terms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "terms" DROP COLUMN "name",
ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "terms_number_key" ON "terms"("number");
