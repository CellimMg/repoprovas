import { TeacherDiscipline } from "@prisma/client";
import * as teacherDisciplineRepository from "../repositories/teachers_discipline_repository"

export async function getTeacherDiscipline(){
    const teacherDiscipline: TeacherDiscipline[] = await teacherDisciplineRepository.readTeacherRepository();

    return teacherDiscipline;
}