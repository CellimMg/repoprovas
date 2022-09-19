import { Disciplina, Instrutor } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function getDisciplines(){
    try {
        const disciplines: Disciplina[] = await prisma.disciplina.findMany();

        return disciplines;
    } catch (error) {
        throw unexpected();
    }
}