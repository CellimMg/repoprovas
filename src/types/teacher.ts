import { Category, Teacher } from "@prisma/client";
import { CategoryWithTests } from "./category";


export type TeacherWithCategories = Partial<Teacher> & {categories: CategoryWithTests[]};

export function toTeacherWithCategories(teacher: Teacher){
    return <TeacherWithCategories>{
        ...teacher,
        categories: []
    };
}
