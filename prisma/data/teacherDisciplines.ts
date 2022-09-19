import { TeacherDiscipline } from "@prisma/client";

const teacherdisciplines: Omit<TeacherDiscipline, "id">[] = [
    {disciplineId: 1, teacherId: 1},
    {disciplineId: 2, teacherId: 1},
    {disciplineId: 3, teacherId: 1},
    {disciplineId: 4, teacherId: 2},
    {disciplineId: 5, teacherId: 2},
    {disciplineId: 6, teacherId: 2}
];

export default teacherdisciplines;