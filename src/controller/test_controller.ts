import { Request, Response } from "express";
import { TestInsert } from "../types/test";
import * as testService from "../services/test_service";
import { codeStringToNumber, isCustomError } from "../types/custom_error";

export async function createTest(req: Request, res: Response){
    try {
        const test: TestInsert = req.body;
        await testService.createTest(test);
        
        return res.sendStatus(201);
    } catch (error) {
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}

export async function read(req: Request, res: Response){
    try {
        const filterBy = req.headers["filterby"];

        if(filterBy === "teacher"){
            const data = await testService.getTestsByTeachers();
            return res.status(200).send({teachers: data});

        }else if(filterBy === "discipline"){
            const data = await testService.getTestsByDisciplines();
            return res.status(200).send({terms: data});

        }
        
        return res.sendStatus(400); //Erro! não informou header
    } catch (error) {
        console.log(error);
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
}

/* export async function readProvasByInstructor(req: Request, res: Response){
    try {
        const provas = await testService.readProvasByInstructor();
        return res.status(200).send({instructors: provas});
    } catch (error) {
        console.log(error);
        if(isCustomError(error!)){
            return res.status(codeStringToNumber(error.code)).send({message: error.message});
        } 
        return res.sendStatus(500);
    }
} */