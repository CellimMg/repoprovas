"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSigninSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato válido de email!",
        "string.base": "Seu email deve estar em formato de texto!"
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "Você deve informar uma senha!"
    })
});
exports.default = userSigninSchema;
