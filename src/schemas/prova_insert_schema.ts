import joi from "joi";
import { ProvaInsert } from "../types/prova";

const provaInsertSchema = joi.object<ProvaInsert>({
    categoriaId: joi.number().required().messages({
        "number.base": "O id da categoria deve ser um número!",
        "any.required": "Você deve informar o id da categoria!"
    }),
    disciplinaId: joi.number().required().messages({
        "number.base": "O id da disciplina deve ser um número!",
        "any.required": "Você deve informar o id da disciplina!"
    }),
    instrutorId: joi.number().required().messages({
        "number.base": "O id do instrutor deve ser um número!",
        "any.required": "Você deve informar o id do instrutor!"
    }),
    nome: joi.string().required().messages({
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