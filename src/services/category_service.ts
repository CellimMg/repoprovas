import { Categoria } from "@prisma/client";
import  * as categoryRepository from "../repositories/category_repository";

export async function readCategories(){
    const categories: Categoria[] = await categoryRepository.getCategories();

    return categories;
}