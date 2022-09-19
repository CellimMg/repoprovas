import { Discipline } from "@prisma/client";
import { CategoryWithTests } from "./category";

export type DisciplineWithCategories = Partial<Discipline> & {categories: CategoryWithTests[]};

export function toDisciplineWithCategories(discipline: Discipline){
    return <DisciplineWithCategories>{
        ...discipline,
        categories: []
    };
}