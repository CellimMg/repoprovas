import {Periodo } from "@prisma/client";

const periodos: Omit<Periodo, "id">[] = [
    {nome: "1º"},
    {nome: "2º"},
    {nome: "3º"},
    {nome: "4º"},
    {nome: "5º"},
    {nome: "6º"},
    {nome: "7º"},
    {nome: "8º"},
    {nome: "9º"},
    {nome: "10º"}
];

export default periodos;
