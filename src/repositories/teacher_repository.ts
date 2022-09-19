import { Teacher } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function readTeachers(){
    try {
        const teachers: Teacher[] = await prisma.teacher.findMany();

        return teachers;
    } catch (error) {
        throw unexpected();
    }
}