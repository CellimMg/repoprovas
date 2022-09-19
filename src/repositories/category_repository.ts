import { Categoria } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function getCategories(){
    try {
        const categories: Categoria[] = await prisma.categoria.findMany();

        return categories;
    } catch (error) {
        throw unexpected();
    }
}