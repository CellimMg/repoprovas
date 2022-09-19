import {Term } from "@prisma/client";

const Terms: Omit<Term, "id">[] = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6}
];

export default Terms;
