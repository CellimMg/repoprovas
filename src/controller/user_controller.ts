import { Request, Response } from "express";
import { UserInsert, userInsertFromSchema, UserInsertSchema } from "../types/User";
import * as userService from "../services/user_service";
import { CustomError } from "../types/CustomError";

export async function createUser(req: Request, res: Response){
    try {
        const userSchema: UserInsertSchema = req.body;
        const userInsert: UserInsert = userInsertFromSchema(userSchema);
        await userService.createUser(userInsert);
        return res.sendStatus(201);
    } catch (error) {
        switch(error){
            case CustomError.ALREADY_EXISTS:
                return res.status(409).send({message: "Este e-mail já está cadastrado!"});
            default:
                return res.sendStatus(500);
        }
    }
}