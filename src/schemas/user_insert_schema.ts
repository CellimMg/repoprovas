import joi from "joi";
import { UserInsert } from "../types/User";

const userInsertSchema = joi.object<UserInsert>({
    email: joi.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato válido de email!",
        "string.base": "Seu email deve estar em formato de texto!"
    }),
    password: joi.string().min(6).required().messages({
        "any.required": "Você deve informar uma senha!",
        "string.min": "Sua senha deve possuir pelo menos 6 caracteres!",
        "string.base": "Sua senha deve estar em formato de texto"
    })
});

export default userInsertSchema;