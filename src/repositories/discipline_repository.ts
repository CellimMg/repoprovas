import { Discipline } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function readDisciplines(){
    try {
        const disciplines: Discipline[] = await prisma.discipline.findMany();

        return disciplines;
    } catch (error) {
        throw unexpected();
    }
}