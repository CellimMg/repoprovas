import joi from "joi";
import { UserInsertSchema } from "../types/user_type";


const userInsertSchema = joi.object<UserInsertSchema>({
    email: joi.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato válido de email!",
        "string.base": "Seu email deve estar em formato de texto!"
    }),
    password: joi.string().min(6).required().messages({
        "any.required": "Você deve informar uma senha!",
        "string.min": "Sua senha deve possuir pelo menos 6 caracteres!",
        "string.base": "Sua senha deve estar em formato de texto!"
    }),
    confirmPassword: joi.string().min(6).valid(joi.ref("password")).required().messages({
        "any.required": "Você deve informar a confirmação de senha!",
        "any.only": "A confirmação e a senha devem ser iguais!",
        "string.min": "Sua confirmação de senha deve possuir pelo menos 6 caracteres!",
        "string.base": "Sua confirmação de senha deve estar em formato de texto!"
    })
});

export default userInsertSchema;