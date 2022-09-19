import { NextFunction, Request, Response } from "express";
import { getUserById } from "../repositories/user_repository";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

export async function validateToken(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if(!token) return res.sendStatus(401);
        const data = jwt.verify(token, process.env.JWT_TOKEN!);
        const userId = (data as JwtPayload)["id"];
        const user: User = await getUserById(userId);

        if(!user) return res.sendStatus(404);
        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}