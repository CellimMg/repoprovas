import { Request, Response } from "express";
import { ProvaInsert } from "../types/prova";
import * as provaService from "../services/prova_service";
import { codeStringToNumber, isCustomError } from "../types/custom_error";

export async function createProva(req: Request, res: Response){
    try {
        const prova: ProvaInsert = req.body;
        await provaService.createProva(prova);
        
        return res.sendStatus(201);
    } catch (error) {
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}

export async function readProvasByPeriodos(req: Request, res: Response){
    try {
        const provas = await provaService.readProvasByPeriodos();
        
        return res.status(200).send({periodos: provas});
    } catch (error) {
        console.log(error);
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}

export async function readProvasByInstructor(req: Request, res: Response){
    try {
        const provas = await provaService.readProvasByInstructor();
        return res.status(200).send({instructors: provas});
    } catch (error) {
        console.log(error);
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}