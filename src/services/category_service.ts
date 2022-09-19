import { Category } from "@prisma/client";
import  * as categoryRepository from "../repositories/category_repository";

export async function getCategories(){
    const categories: Category[] = await categoryRepository.readCategories();

    return categories;
}