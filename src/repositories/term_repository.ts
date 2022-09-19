import { Term } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function readTerms(){
    try {
        const terms: Term[] = await prisma.term.findMany();

        return terms;
    } catch (error) {
        throw unexpected();
    }
}