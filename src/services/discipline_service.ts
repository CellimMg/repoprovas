import { Discipline } from "@prisma/client";
import * as disciplineRepository from "../repositories/discipline_repository";


export async function getDisciplines(){
    const disciplines: Discipline[] = await disciplineRepository.readDisciplines();

    return disciplines;
}