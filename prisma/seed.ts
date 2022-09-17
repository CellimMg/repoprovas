import { PrismaClient } from "@prisma/client";
import categories from "./data/category";
import disciplines from "./data/discipline";
import instructors from "./data/instructor";

const prisma = new PrismaClient;

async function main() {
    await prisma.categoria.createMany({data: categories});
    await prisma.disciplina.createMany({data: disciplines});
    await prisma.instrutor.createMany({data: instructors});
}

main().then( _ => console.log("Finished seeding!")).catch(error => console.log(error)).finally(() => {
    prisma.$disconnect;
});