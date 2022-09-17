import { Categoria } from "@prisma/client";

const categories: Omit<Categoria, "id">[] = [
    {nome: "P1"},
    {nome: "P2"},
    {nome: "P3"},
    {nome: "P2ch"},
    {nome: "Outras"},
];

export default categories;
