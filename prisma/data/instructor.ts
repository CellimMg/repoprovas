import { Instrutor } from "@prisma/client";

const instructors: Omit<Instrutor, "id">[] = [
    {nome: "Fernanda"},
    {nome: "Marcelo"},
    {nome: "Sibéria"},
    {nome: "José"},
    {nome: "Bolitos"},
    {nome: "Rodolfo"},
];

export default instructors;