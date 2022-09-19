import { Periodo } from "@prisma/client";
import  * as periodoRepository from "../repositories/periodo_repository";

export async function readPeriodos(){
    const periodos: Periodo[] = await periodoRepository.getPeriodos();

    return periodos;
}