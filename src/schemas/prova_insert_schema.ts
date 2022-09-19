import joi from "joi";
import { TestInsert } from "../types/test";

const provaInsertSchema = joi.object<TestInsert>({
    categoryId: joi.number().required().messages({
        "number.base": "O id da categoria deve ser um número!",
        "any.required": "Você deve informar o id da categoria!"
    }),
    teacherDisciplineId: joi.number().required().messages({
        "number.base": "O id da disciplina deve ser um número!",
        "any.required": "Você deve informar o id da disciplina/professor!"
    }),
    name: joi.string().required().messages({
        "string.base": "O nome deve ser um texto!",
        "any.required": "Você deve informar o nome da prova!"
    }),
    pdfUrl: joi.string().uri().required().messages({
        "string.base": "O pdf url deve ser um texto!",
        "string.uri": "Formato de url inválido!",
        "any.required": "Você deve informar o url do pdf!"
    })
});

export default provaInsertSchema;