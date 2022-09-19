import { Instrutor } from "@prisma/client";
import * as instructorRepository from "../repositories/instructor_repository";


export async function getInstructors(){
    const instructors: Instrutor[] = await instructorRepository.getInstructors();

    return instructors;
}