import { Prisma, PrismaClient } from "@prisma/client";
import { notFound, unexpected } from "../types/custom_error";
import { ProvaInsert } from "../types/prova";
const prisma = new PrismaClient();

export async function createProva(prova: ProvaInsert) {
    try {
        await prisma.prova.create({ data: prova });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                const columnWithError: string = (error.meta!["field_name"] as string).split("_")[1];
                throw notFound(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
            }
        }
        throw unexpected();
    }
}