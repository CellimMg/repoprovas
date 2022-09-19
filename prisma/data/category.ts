import { Category } from "@prisma/client";

const categories: Omit<Category, "id">[] = [
    {name: "Projeto"},
    {name: "Prática"},
    {name: "Recuperação"},
];

export default categories;
