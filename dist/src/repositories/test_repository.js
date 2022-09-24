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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTestsWithTeacher = exports.readTests = exports.createTest = void 0;
const client_1 = require("@prisma/client");
const custom_error_1 = require("../types/custom_error");
const prisma = new client_1.PrismaClient();
function createTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.test.create({ data: test });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2003") {
                    const columnWithError = error.meta["field_name"].split("_")[1];
                    throw (0, custom_error_1.notFound)(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
                }
            }
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.createTest = createTest;
function readTests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tests = yield prisma.test.findMany();
            return tests;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2003") {
                    const columnWithError = error.meta["field_name"].split("_")[1];
                    throw (0, custom_error_1.notFound)(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
                }
            }
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.readTests = readTests;
function readTestsWithTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.term.findMany({});
            return data;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2003") {
                    const columnWithError = error.meta["field_name"].split("_")[1];
                    throw (0, custom_error_1.notFound)(`Ops! Não existem dados compatíveis com '${columnWithError}'`);
                }
            }
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.readTestsWithTeacher = readTestsWithTeacher;
