import prisma from "../database/postgres";
import { CustomError } from "../types/CustomError";
import { UserInsert } from "../types/User";
import {Prisma} from "@prisma/client";


export async function createUser(user: UserInsert){
    try {
        await prisma.user.create({data: user});
    } catch (error) {
        if( error instanceof Prisma.PrismaClientKnownRequestError ){
            switch(error.code){
                case 'P2002': //Error de inserção de campo @unique
                    throw CustomError.ALREADY_EXISTS;
            }
        }

        throw CustomError.UNEXPECTED;
    }
}