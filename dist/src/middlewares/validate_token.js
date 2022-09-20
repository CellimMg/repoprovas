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
exports.validateToken = void 0;
const user_repository_1 = require("../repositories/user_repository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                return res.sendStatus(401);
            const data = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
            const userId = data["id"];
            const user = yield (0, user_repository_1.getUserById)(userId);
            if (!user)
                return res.sendStatus(404);
            res.locals.user = user;
            next();
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });
}
exports.validateToken = validateToken;
