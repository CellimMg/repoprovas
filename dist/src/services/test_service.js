"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByTeachers = exports.getTestsByDisciplines = exports.createTest = void 0;
const testRepository = __importStar(require("../repositories/test_repository"));
const term_service_1 = require("./term_service");
const discipline_service_1 = require("./discipline_service");
const teacher_service_1 = require("./teacher_service");
const category_service_1 = require("./category_service");
const term_1 = require("../types/term");
const discipline_1 = require("../types/discipline");
const category_1 = require("../types/category");
const teacher_discipline_service_1 = require("./teacher_discipline_service");
const teacher_1 = require("../types/teacher");
function createTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        yield testRepository.createTest(test);
    });
}
exports.createTest = createTest;
function getTestsByDisciplines() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testRepository.readTests();
        const terms = yield (0, term_service_1.getTerms)();
        const disciplines = yield (0, discipline_service_1.getDisciplines)();
        const teachers = yield (0, teacher_service_1.getTeachers)();
        const categories = yield (0, category_service_1.getCategories)();
        const teachersDiscipline = yield (0, teacher_discipline_service_1.getTeacherDiscipline)();
        const termsWithDisciplines = terms.map(term => (0, term_1.toTermWithDisciplines)(term));
        const disciplinesWithCategories = disciplines.map(discipline => (0, discipline_1.toDisciplineWithCategories)(discipline));
        for (let test of tests) {
            test.name = test.name + ` (${(_a = teachers.find(teacher => { var _a; return teacher.id === ((_a = teachersDiscipline.find(teacherDiscipline => teacherDiscipline.id == test.teacherDisciplineId)) === null || _a === void 0 ? void 0 : _a.teacherId); })) === null || _a === void 0 ? void 0 : _a.name})`;
        }
        for (let discipline of disciplinesWithCategories) {
            const categoriesWithTest = categories.map(category => (0, category_1.toCategoryWithTests)(category));
            const _teachersDiscipline = teachersDiscipline.filter(teacherDiscipline => teacherDiscipline.disciplineId === discipline.id);
            const _testOfDiscipline = tests.filter(test => _teachersDiscipline.filter(_teacherDiscipline => _teacherDiscipline.id === test.teacherDisciplineId).length > 0);
            for (let category of categoriesWithTest) {
                category.tests = _testOfDiscipline.filter(test => test.categoryId === category.id);
            }
            discipline.categories = categoriesWithTest;
        }
        for (let term of termsWithDisciplines) {
            term.disciplines = disciplinesWithCategories.filter(disciplineWithCategories => disciplineWithCategories.termId === term.id);
        }
        return termsWithDisciplines;
    });
}
exports.getTestsByDisciplines = getTestsByDisciplines;
function getTestsByTeachers() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testRepository.readTests();
        const disciplines = yield (0, discipline_service_1.getDisciplines)();
        const teachers = yield (0, teacher_service_1.getTeachers)();
        const categories = yield (0, category_service_1.getCategories)();
        const teachersDiscipline = yield (0, teacher_discipline_service_1.getTeacherDiscipline)();
        const teacherWithCategories = teachers.map(teacher => (0, teacher_1.toTeacherWithCategories)(teacher));
        for (let test of tests) {
            const disciplineId = (_a = teachersDiscipline.find(teacherDiscipline => teacherDiscipline.id == test.teacherDisciplineId)) === null || _a === void 0 ? void 0 : _a.disciplineId;
            const disciplineName = (_b = disciplines.find(discipline => discipline.id == disciplineId)) === null || _b === void 0 ? void 0 : _b.name;
            test.name = `${test.name} (${disciplineName})`;
        }
        for (let teacher of teacherWithCategories) {
            const _teacherDisciplines = [...teachersDiscipline.filter(teacherDiscipline => teacherDiscipline.teacherId === teacher.id)];
            const _testsTeacher = [...tests.filter(test => _teacherDisciplines.filter(teacherDiscipline => teacherDiscipline.id === test.teacherDisciplineId).length != 0)];
            const _categoriesWithTests = [...categories];
            const categoriesTeacher = _categoriesWithTests.filter(categoryWithTest => _testsTeacher.filter(_testTeacher => _testTeacher.categoryId === categoryWithTest.id).length != 0);
            const categoriesWithTests = categoriesTeacher.map(category => (0, category_1.toCategoryWithTests)(category));
            for (let category of categoriesWithTests) {
                category.tests = [..._testsTeacher.filter(_testTeacher => _testTeacher.categoryId === category.id)];
            }
            teacher.categories = categoriesWithTests;
        }
        return teacherWithCategories;
    });
}
exports.getTestsByTeachers = getTestsByTeachers;
//Periodos -> Disciplinas -> Categorias -> Provas
