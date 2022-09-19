import { Categoria, Disciplina, Instrutor, Prova } from "@prisma/client";
import { number, string } from "joi";

export interface ProvaAllData {
    id: number,
    nome: string,
    pdfUrl: string,
};

export type ProvaInsert = Omit<Prova, "id">;