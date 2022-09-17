/*
  Warnings:

  - You are about to drop the `Prova` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prova" DROP CONSTRAINT "Prova_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Prova" DROP CONSTRAINT "Prova_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "Prova" DROP CONSTRAINT "Prova_instrutorId_fkey";

-- DropTable
DROP TABLE "Prova";

-- CreateTable
CREATE TABLE "provas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "instrutorId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "provas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "provas" ADD CONSTRAINT "provas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD CONSTRAINT "provas_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "instrutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD CONSTRAINT "provas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
