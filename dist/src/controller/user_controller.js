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
exports.signInUser = exports.createUser = void 0;
const user_1 = require("../types/user");
const userService = __importStar(require("../services/user_service"));
const custom_error_1 = require("../types/custom_error");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userSchema = req.body;
            const userInsert = (0, user_1.userInsertFromSchema)(userSchema);
            yield userService.createUser(userInsert);
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
exports.createUser = createUser;
function signInUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userSignIn = req.body;
            const token = yield userService.signInUser(userSignIn);
            return res.status(200).send({ token: token });
        }
        catch (error) {
            if ((0, custom_error_1.isCustomError)(error)) {
                return res.status((0, custom_error_1.codeStringToNumber)(error.code)).send({ message: error.message });
            }
            return res.sendStatus(500);
        }
    });
}
exports.signInUser = signInUser;
