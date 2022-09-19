import { DisciplinaData } from "./discipline";

export interface PeriodoData{
    id: number,
    nome: string,
    disciplinas: DisciplinaData[]
}