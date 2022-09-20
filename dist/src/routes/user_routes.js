"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user_controller");
const validate_schema_1 = require("../middlewares/validate_schema");
const user_insert_schema_1 = __importDefault(require("../schemas/user_insert_schema"));
const user_signin_schema_1 = __importDefault(require("../schemas/user_signin_schema"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("/signUp", (0, validate_schema_1.validateSchema)(user_insert_schema_1.default), user_controller_1.createUser);
userRoutes.post("/signIn", (0, validate_schema_1.validateSchema)(user_signin_schema_1.default), user_controller_1.signInUser);
exports.default = userRoutes;
