import { TestInsert } from "../types/test";
import * as testRepository from "../repositories/test_repository";
import { getTerms } from "./term_service";
import { getDisciplines } from "./discipline_service";
import { getTeachers } from "./teacher_service";
import { getCategories } from "./category_service";
import { toTermWithDisciplines } from "../types/term";
import { toDisciplineWithCategories } from "../types/discipline";
import { toCategoryWithTests } from "../types/category";
import { getTeacherDiscipline } from "./teacher_discipline_service";
import { toTeacherWithCategories } from "../types/teacher";

export async function createTest(test: TestInsert) {
    await testRepository.createTest(test);
}

export async function getTestsByDisciplines(){
    const tests = await testRepository.readTests();
    const terms = await getTerms();
    const disciplines = await getDisciplines();
    const teachers = await getTeachers();
    const categories = await getCategories();
    const teachersDiscipline = await getTeacherDiscipline();
    
    const termsWithDisciplines = terms.map(term => toTermWithDisciplines(term));
    const disciplinesWithCategories = disciplines.map(discipline => toDisciplineWithCategories(discipline));


    for(let test of tests){
        test.name = test.name + ` (${teachers.find(teacher => teacher.id === (teachersDiscipline.find(teacherDiscipline => teacherDiscipline.id == test.teacherDisciplineId)?.teacherId))?.name})`;
    }

    

    for(let discipline of disciplinesWithCategories){
        const categoriesWithTest = categories.map(category => toCategoryWithTests(category));
        const _teachersDiscipline = teachersDiscipline.filter(teacherDiscipline => teacherDiscipline.disciplineId === discipline.id)
        const _testOfDiscipline = tests.filter(test => _teachersDiscipline.filter(_teacherDiscipline => _teacherDiscipline.id === test.teacherDisciplineId).length > 0);
    
        for(let category of categoriesWithTest){
            category.tests = _testOfDiscipline.filter(test => test.categoryId === category.id);
        }

        discipline.categories = categoriesWithTest;
    }

    for(let term of termsWithDisciplines){
        term.disciplines = disciplinesWithCategories.filter(
            disciplineWithCategories => disciplineWithCategories.termId === term.id);
    }


    return termsWithDisciplines;
}

export async function getTestsByTeachers(){
    const tests = await testRepository.readTests();
    const disciplines = await getDisciplines();
    const teachers = await getTeachers();
    const categories = await getCategories();
    const teachersDiscipline = await getTeacherDiscipline();

    const teacherWithCategories = teachers.map(teacher => toTeacherWithCategories(teacher));

    for(let test of tests){
        const disciplineId = teachersDiscipline.find(teacherDiscipline => teacherDiscipline.id == test.teacherDisciplineId)?.disciplineId;
        const disciplineName = disciplines.find(discipline => discipline.id == disciplineId)?.name;
        test.name = `${test.name} (${disciplineName})`;
    }


    for(let teacher of teacherWithCategories){
            
        const _teacherDisciplines = [...teachersDiscipline.filter(teacherDiscipline => teacherDiscipline.teacherId === teacher.id)];
        const _testsTeacher = [...tests.filter(
            test => _teacherDisciplines.filter(
                teacherDiscipline => teacherDiscipline.id === test.teacherDisciplineId).length != 0)];

       
        const _categoriesWithTests = [...categories];
        const categoriesTeacher = _categoriesWithTests.filter(
            categoryWithTest => _testsTeacher.filter(
                _testTeacher => _testTeacher.categoryId === categoryWithTest.id).length != 0);

        const categoriesWithTests = categoriesTeacher.map(category => toCategoryWithTests(category));
        for(let category of categoriesWithTests){
            category.tests = [..._testsTeacher.filter(_testTeacher => _testTeacher.categoryId === category.id)];
        }
        
        teacher.categories = categoriesWithTests;
    }

    return teacherWithCategories;

}

//Periodos -> Disciplinas -> Categorias -> Provas





