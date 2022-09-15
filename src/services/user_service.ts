import { CustomError } from "../types/CustomError";
import { UserInsert } from "../types/User";
import dotenv from "dotenv";
dotenv.config();
import * as userRepository from "../repositories/user_repository";
import bcrypt from "bcrypt";


export async function createUser(user: UserInsert){
    await userRepository.createUser({...user, password: hashPassword(user.password)});
}

function hashPassword(password: string){
    return bcrypt.hashSync(password, parseInt(process.env.HASH_SALT!));
}