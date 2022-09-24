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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.signInUser = exports.createUser = void 0;
const custom_error_1 = require("../types/custom_error");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRepository = __importStar(require("../repositories/user_repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userRepository.createUser(Object.assign(Object.assign({}, user), { password: hashPassword(user.password) }));
    });
}
exports.createUser = createUser;
function signInUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userRepository.getUser(user);
        if (!comparePassword(user.password, userData.password))
            throw (0, custom_error_1.wrongCredentials)("E-mail e/ou senha inválidos!");
        const token = createToken(userData);
        return token;
    });
}
exports.signInUser = signInUser;
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userdata = yield userRepository.getUserById(userId);
        return userdata;
    });
}
exports.getUserById = getUserById;
function createToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN);
}
function comparePassword(password, userDataPassword) {
    return bcrypt_1.default.compareSync(password, userDataPassword);
}
function hashPassword(password) {
    return bcrypt_1.default.hashSync(password, parseInt(process.env.HASH_SALT));
}
