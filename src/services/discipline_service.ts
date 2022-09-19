import { Disciplina } from "@prisma/client";
import * as disciplineRepository from "../repositories/discipline_repository";


export async function getDisciplines(){
    const disciplines: Disciplina[] = await disciplineRepository.getDisciplines();

    return disciplines;
}