import { NextFunction, Response, Request } from "express";
import joi from "joi";
import { UserInsert } from "../types/User";

export function validateSchema(schema: joi.ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const {error} = schema.validate(data);
        if(error) return res.status(422).send({message: error.message})

        next();
    };
}