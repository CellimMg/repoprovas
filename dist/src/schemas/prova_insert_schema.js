"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const provaInsertSchema = joi_1.default.object({
    categoryId: joi_1.default.number().required().messages({
        "number.base": "O id da categoria deve ser um número!",
        "any.required": "Você deve informar o id da categoria!"
    }),
    teacherDisciplineId: joi_1.default.number().required().messages({
        "number.base": "O id da disciplina deve ser um número!",
        "any.required": "Você deve informar o id da disciplina/professor!"
    }),
    name: joi_1.default.string().required().messages({
        "string.base": "O nome deve ser um texto!",
        "any.required": "Você deve informar o nome da prova!"
    }),
    pdfUrl: joi_1.default.string().uri().required().messages({
        "string.base": "O pdf url deve ser um texto!",
        "string.uri": "Formato de url inválido!",
        "any.required": "Você deve informar o url do pdf!"
    })
});
exports.default = provaInsertSchema;
