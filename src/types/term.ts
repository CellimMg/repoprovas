import { Term } from "@prisma/client";
import {  DisciplineWithCategories } from "./discipline";

export type TermWithDisciplines = Partial<Term> & {disciplines: DisciplineWithCategories[]};

export function toTermWithDisciplines(term: Term){
    return <TermWithDisciplines>{
        ...term,
        disciplines: []
    };
}