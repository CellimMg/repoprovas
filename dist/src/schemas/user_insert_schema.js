"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userInsertSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato válido de email!",
        "string.base": "Seu email deve estar em formato de texto!"
    }),
    password: joi_1.default.string().min(6).required().messages({
        "any.required": "Você deve informar uma senha!",
        "string.min": "Sua senha deve possuir pelo menos 6 caracteres!",
        "string.base": "Sua senha deve estar em formato de texto!"
    }),
    confirmPassword: joi_1.default.string().min(6).valid(joi_1.default.ref("password")).required().messages({
        "any.required": "Você deve informar a confirmação de senha!",
        "any.only": "A confirmação e a senha devem ser iguais!",
        "string.min": "Sua confirmação de senha deve possuir pelo menos 6 caracteres!",
        "string.base": "Sua confirmação de senha deve estar em formato de texto!"
    })
});
exports.default = userInsertSchema;
