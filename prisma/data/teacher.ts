import { Teacher } from "@prisma/client";

const instructors: Omit<Teacher, "id">[] = [
    {name: "Diego Pinho"},
    {name: "Bruna Hamori"},
];

export default instructors;