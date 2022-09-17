import prisma from "../database/postgres";
import { alreadyExists, notFound, unexpected, wrongCredentials } from "../types/custom_error";
import { UserInsert } from "../types/user";
import {Prisma, User} from "@prisma/client";


export async function createUser(user: UserInsert){
    try {
        await prisma.user.create({data: user});
    } catch (error) {
        if( error instanceof Prisma.PrismaClientKnownRequestError ){
            switch(error.code){
                case 'P2002': //Error de inserção de campo @unique
                    throw alreadyExists("Este e-mail já está cadastrado!");
            }
        }

        throw unexpected();
    }
}

export async function getUser(user: UserInsert): Promise<User>{
    try {
       const userData: User = await prisma.user.findFirstOrThrow({where: {email: user.email}});
        return userData;
    } catch (error) {

        if(error instanceof Prisma.NotFoundError) throw wrongCredentials("E-mail e/ou senha inválidos!");

        throw unexpected();
    }
}

export async function getUserById(userId: number): Promise<User>{
    try {
       const userData: User = await prisma.user.findFirstOrThrow({where: {id: userId}});
        return userData;
    } catch (error) {

        if(error instanceof Prisma.NotFoundError) throw notFound("Este usuário não existe!");

        throw unexpected();
    }
}