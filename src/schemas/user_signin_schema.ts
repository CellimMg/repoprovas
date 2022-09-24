import { User } from "@prisma/client";
import joi from "joi";
import { UserInsert } from "../types/user_type";


const userSigninSchema = joi.object<UserInsert>({
    email: joi.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato válido de email!",
        "string.base": "Seu email deve estar em formato de texto!"
    }),
    password: joi.string().required().messages({
        "any.required": "Você deve informar uma senha!"
    })
});

export default userSigninSchema;