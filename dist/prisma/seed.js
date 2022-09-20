"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const category_1 = __importDefault(require("./data/category"));
const discipline_1 = __importDefault(require("./data/discipline"));
const teacher_1 = __importDefault(require("./data/teacher"));
const teacherDisciplines_1 = __importDefault(require("./data/teacherDisciplines"));
const term_1 = __importDefault(require("./data/term"));
const prisma = new client_1.PrismaClient;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.term.createMany({ data: term_1.default });
        yield prisma.category.createMany({ data: category_1.default });
        yield prisma.discipline.createMany({ data: discipline_1.default });
        yield prisma.teacher.createMany({ data: teacher_1.default });
        yield prisma.teacherDiscipline.createMany({ data: teacherDisciplines_1.default });
    });
}
main().then(_ => console.log("Finished seeding!")).catch(error => console.log(error)).finally(() => {
    prisma.$disconnect;
});
