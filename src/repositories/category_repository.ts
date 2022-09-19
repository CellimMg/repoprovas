import { Category } from "@prisma/client";
import prisma from "../database/postgres";
import { unexpected } from "../types/custom_error";

export async function readCategories(){
    try {
        const categories: Category[] = await prisma.category.findMany();

        return categories;
    } catch (error) {
        throw unexpected();
    }
}