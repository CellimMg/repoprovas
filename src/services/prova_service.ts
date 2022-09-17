import { ProvaInsert } from "../types/prova";
import * as provaRepository from "../repositories/prova_repository";

export async function createProva(prova: ProvaInsert){
    await provaRepository.createProva(prova);
}

