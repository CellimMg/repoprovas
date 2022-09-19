/*
  Warnings:

  - Added the required column `periodoId` to the `disciplinas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disciplinas" ADD COLUMN     "periodoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "periodos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "periodos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "periodos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
