import { ProvaAllData, ProvaInsert } from "../types/prova";
import * as provaRepository from "../repositories/prova_repository";
import { Categoria, Disciplina, Instrutor, Periodo, Prova } from "@prisma/client";
import { readCategories } from "./category_service";
import { readPeriodos } from "./periodo_service";
import { getInstructors } from "./instructor_service";
import { getDisciplines } from "./discipline_service";
import { unexpected } from "../types/custom_error";

export async function createProva(prova: ProvaInsert) {
    await provaRepository.createProva(prova);
}

export async function readProvasByPeriodos() {
    try {
        const provas: Prova[] = await provaRepository.readProvas();

        const categorias: Categoria[] = await readCategories();
        const periodos: Periodo[] = await readPeriodos();
        const instructors: Instrutor[] = await getInstructors();
        const disciplines: Disciplina[] = await getDisciplines();


        const dataProvas = [];
        for (let prova of provas) {
            const instructorName = instructors.find(instructor => instructor.id === prova.instrutorId)?.nome;
            dataProvas.push({ ...prova, instructorName });
        }
        console.log(dataProvas);

        const dataDisciplines = [];
        for (let discipline of disciplines) {
            const provas = dataProvas.filter(prova => prova.disciplinaId === discipline.id);

            const categoriesIds = [...new Set(provas.map(prova => prova.categoriaId))];
            const categoriesData = categorias.filter(categoria => categoriesIds.includes(categoria.id));
            const categoriesDataWithProvas = [];

            for (let categoria of categoriesData) {
                const categorieDataWithProvas = { ...categoria, provas: provas.filter(prova => prova.categoriaId === categoria.id) }
                categoriesDataWithProvas.push(categorieDataWithProvas);
            }

            const dataDiscipline = { ...discipline, categorias: categoriesDataWithProvas };
            dataDisciplines.push(dataDiscipline);
        }
        console.log(dataDisciplines);

        const periodosWithDisciplines = [];
        for (let periodo of periodos) {
            const periodoWithDisciplines = { ...periodo, disciplinas: dataDisciplines.filter(discipline => discipline.periodoId === periodo.id) };
            periodosWithDisciplines.push(periodoWithDisciplines);
        }
        console.log(periodosWithDisciplines);

        return periodosWithDisciplines;
    } catch (error) {
        console.log(error);
        throw unexpected();
    }
}

export async function readProvasByInstructor() {
    try {
        const provas: Prova[] = await provaRepository.readProvas();

        const categorias: Categoria[] = await readCategories();
        const instructors: Instrutor[] = await getInstructors();
        const disciplines: Disciplina[] = await getDisciplines();


        const dataProvas = [];
        for (let prova of provas) {
            const disciplineName = disciplines.find(discipline => discipline.id === prova.disciplinaId)?.nome;
            dataProvas.push({ ...prova, disciplineName });
        }

        const instructorsCategories = [];
        for (let instructor of instructors) {
            const provas = dataProvas.filter(prova => prova.instrutorId === instructor.id);

            const categoriesIds = [...new Set(provas.map(prova => prova.categoriaId))];
            const categoriesData = categorias.filter(categoria => categoriesIds.includes(categoria.id));
            const categoriesDataWithProvas = [];

            for (let categoria of categoriesData) {
                const categorieDataWithProvas = { ...categoria, provas: provas.filter(prova => prova.categoriaId === categoria.id) }
                categoriesDataWithProvas.push(categorieDataWithProvas);
            }

            const instructorCategory = { ...instructor, categorias: categoriesDataWithProvas };
            instructorsCategories.push(instructorCategory);
        }

        console.log(instructorsCategories);
        return instructorsCategories;
    } catch (error) {
        console.log(error);
        throw unexpected();
    }
}






