import { Category, Test } from "@prisma/client";

export type CategoryWithTests = Partial<Category> & {tests: Test[]};


export function toCategoryWithTests(category: Category){
    return <CategoryWithTests>{
        ...category,
        tests: []
    };
}