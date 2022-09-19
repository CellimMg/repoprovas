import { Discipline } from "@prisma/client";

const disciplines: Omit<Discipline, "id">[] = [
    {name: "HTML e CSS", termId: 1},
    {name: "Javascript", termId: 2},
    {name: "React", termId: 3},
    {name: "Humildade", termId: 1},
    {name: "Planejamento", termId: 2},
    {name: "Autoconfiança", termId: 3},
];

export default disciplines;