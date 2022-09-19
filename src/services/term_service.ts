import { Term } from "@prisma/client";
import  * as periodoRepository from "../repositories/term_repository";

export async function getTerms(){
    const periodos: Term[] = await periodoRepository.readTerms();

    return periodos;
}