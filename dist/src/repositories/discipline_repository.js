"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDisciplines = void 0;
const postgres_1 = __importDefault(require("../database/postgres"));
const custom_error_1 = require("../types/custom_error");
function readDisciplines() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const disciplines = yield postgres_1.default.discipline.findMany();
            return disciplines;
        }
        catch (error) {
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.readDisciplines = readDisciplines;