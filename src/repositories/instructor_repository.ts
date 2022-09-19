import { Instrutor } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function getInstructors(){
    try {
        const instructors: Instrutor[] = await prisma.instrutor.findMany();

        return instructors;
    } catch (error) {
        throw unexpected();
    }
}