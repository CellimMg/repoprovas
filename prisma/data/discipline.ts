import { Disciplina } from "@prisma/client";

const disciplines: Omit<Disciplina, "id">[] = [
    { nome: "Artes", periodoId: 1 },
    { nome: "Biologia", periodoId: 2 },
    { nome: "Geografia", periodoId: 1 },
    { nome: "Matemática", periodoId: 2 },
    { nome: "Física", periodoId: 3 },
    { nome: "História", periodoId: 1 },
    { nome: "Português", periodoId: 4 },
];

export default disciplines;