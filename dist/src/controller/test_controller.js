"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = exports.createTest = void 0;
const testService = __importStar(require("../services/test_service"));
const custom_error_1 = require("../types/custom_error");
function createTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const test = req.body;
            yield testService.createTest(test);
            return res.sendStatus(201);
        }
        catch (error) {
            if ((0, custom_error_1.isCustomError)(error)) {
                return res.status((0, custom_error_1.codeStringToNumber)(error.code)).send({ message: error.message });
            }
            return res.sendStatus(500);
        }
    });
}
exports.createTest = createTest;
function read(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = req.headers["filterby"];
            if (filterBy === "teacher") {
                const data = yield testService.getTestsByTeachers();
                return res.status(200).send({ teachers: data });
            }
            else if (filterBy === "discipline") {
                const data = yield testService.getTestsByDisciplines();
                return res.status(200).send({ terms: data });
            }
            return res.sendStatus(400); //Erro! não informou header
        }
        catch (error) {
            console.log(error);
            if ((0, custom_error_1.isCustomError)(error)) {
                return res.status((0, custom_error_1.codeStringToNumber)(error.code)).send({ message: error.message });
            }
            return res.sendStatus(500);
        }
    });
}
exports.read = read;
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
