import { Periodo } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function getPeriodos(){
    try {
        const periodos: Periodo[] = await prisma.periodo.findMany();

        return periodos;
    } catch (error) {
        throw unexpected();
    }
}