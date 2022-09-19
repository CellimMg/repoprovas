import { Prisma, PrismaClient, Test } from "@prisma/client";
import { notFound, unexpected } from "../types/custom_error";
import { TestInsert } from "../types/test";
const prisma = new PrismaClient();

export async function createTest(test: TestInsert) {
    try {
        await prisma.test.create({ data: test });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                const columnWithError: string = (error.meta!["field_name"] as string).split("_")[1];
                throw notFound(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
            }
        }
        throw unexpected();
    }
}

export async function readTests() {
    try {
        const tests: Test[]= await prisma.test.findMany();
        
        return tests;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                const columnWithError: string = (error.meta!["field_name"] as string).split("_")[1];
                throw notFound(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
            }
        }
        throw unexpected();
    }
}

export async function readTestsWithTeacher() {
    try {
        const data = await prisma.term.findMany({});
        
        return data;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                const columnWithError: string = (error.meta!["field_name"] as string).split("_")[1];
                throw notFound(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
            }
        }
        throw unexpected();
    }
}



