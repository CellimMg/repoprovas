import { CustomError } from "../types/CustomError";
import { UserInsert } from "../types/User";
import dotenv from "dotenv";
dotenv.config();
import * as userRepository from "../repositories/user_repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";


export async function createUser(user: UserInsert){
    await userRepository.createUser({...user, password: hashPassword(user.password)});
}

export async function signInUser(user: UserInsert){
    const userData = await userRepository.getUser(user);
    if(!comparePassword(user.password, userData.password)) throw CustomError.WRONG_CREDENTIALS;
    const token = createToken(userData);
    return token;
}

function createToken(user: User){
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(payload, process.env.JWT_TOKEN!);
}

function comparePassword(password: string, userDataPassword: string){
    return bcrypt.compareSync(password, userDataPassword);
}

function hashPassword(password: string){
    return bcrypt.hashSync(password, parseInt(process.env.HASH_SALT!));
}