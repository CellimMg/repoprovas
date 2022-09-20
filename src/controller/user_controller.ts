import { Request, Response } from "express";
import * as userService from "../services/user_service";
import { codeStringToNumber, isCustomError } from "../types/custom_error";
import { UserInsert, userInsertFromSchema, UserInsertSchema } from "../types/user";

export async function createUser(req: Request, res: Response){
    try {
        const userSchema: UserInsertSchema = req.body;
        const userInsert: UserInsert = userInsertFromSchema(userSchema);
        await userService.createUser(userInsert);
        return res.sendStatus(201);
    } catch (error) {
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}


export async function signInUser(req: Request, res: Response){
    try {
        const userSignIn: UserInsert = req.body;
        const token: string = await userService.signInUser(userSignIn);
        return res.status(200).send({token: token});
    } catch (error) {
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}