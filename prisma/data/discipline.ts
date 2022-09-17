import { Disciplina } from "@prisma/client";

const disciplines: Omit<Disciplina, "id">[] = [
    {nome: "Artes"},
    {nome: "Biologia"},
    {nome: "Geografia"},
    {nome: "Matemática"},
    {nome: "Física"},
    {nome: "História"},
    {nome: "Português"},
];

export default disciplines;