import { Teacher } from "@prisma/client";
import * as instructorRepository from "../repositories/teacher_repository";


export async function getTeachers(){
    const instructors: Teacher[] = await instructorRepository.readTeachers();

    return instructors;
}