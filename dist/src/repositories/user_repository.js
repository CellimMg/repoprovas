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
exports.getUserById = exports.getUser = exports.createUser = void 0;
const postgres_1 = __importDefault(require("../database/postgres"));
const custom_error_1 = require("../types/custom_error");
const client_1 = require("@prisma/client");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield postgres_1.default.user.create({ data: user });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002': //Error de inserção de campo @unique
                        throw (0, custom_error_1.alreadyExists)("Este e-mail já está cadastrado!");
                }
            }
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.createUser = createUser;
function getUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield postgres_1.default.user.findFirstOrThrow({ where: { email: user.email } });
            return userData;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.NotFoundError)
                throw (0, custom_error_1.wrongCredentials)("E-mail e/ou senha inválidos!");
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.getUser = getUser;
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield postgres_1.default.user.findFirstOrThrow({ where: { id: userId } });
            return userData;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.NotFoundError)
                throw (0, custom_error_1.notFound)("Este usuário não existe!");
            throw (0, custom_error_1.unexpected)();
        }
    });
}
exports.getUserById = getUserById;
