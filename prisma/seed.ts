import { PrismaClient } from "@prisma/client";
import categories from "./data/category";
import disciplines from "./data/discipline";
import instructors from "./data/teacher";
import teacherdisciplines from "./data/teacherDisciplines";
import periodos from "./data/term";

const prisma = new PrismaClient;

async function main() {
    await prisma.term.createMany({data: periodos});
    await prisma.category.createMany({data: categories});
    await prisma.discipline.createMany({data: disciplines});
    await prisma.teacher.createMany({data: instructors});
    await prisma.teacherDiscipline.createMany({data: teacherdisciplines});
}

main().then( _ => console.log("Finished seeding!")).catch(error => console.log(error)).finally(() => {
    prisma.$disconnect;
});