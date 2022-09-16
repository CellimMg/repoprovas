import prisma from "../database/postgres";
import { CustomError } from "../types/CustomError";
import { UserInsert } from "../types/User";
import {Prisma, User} from "@prisma/client";


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

export async function getUser(user: UserInsert): Promise<User>{
    try {
       const userData: User = await prisma.user.findFirstOrThrow({where: {email: user.email}});
        return userData;
    } catch (error) {
        
        if( error instanceof Prisma.PrismaClientKnownRequestError ){
            switch(error.code){
                case 'P2002': //Error de inserção de campo @unique
                    throw CustomError.ALREADY_EXISTS;
            }
        }

        if(error instanceof Prisma.NotFoundError) throw CustomError.WRONG_CREDENTIALS;

        throw CustomError.UNEXPECTED;
    }
}