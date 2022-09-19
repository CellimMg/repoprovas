import { TeacherDiscipline } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function readTeacherRepository(){
    try {
        const teacherDiscipline: TeacherDiscipline[] = await prisma.teacherDiscipline.findMany();

        return teacherDiscipline;
    } catch (error) {
        throw unexpected();
    }
}