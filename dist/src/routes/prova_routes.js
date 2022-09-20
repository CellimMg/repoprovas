"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controller/test_controller");
const validate_schema_1 = require("../middlewares/validate_schema");
const validate_token_1 = require("../middlewares/validate_token");
const prova_insert_schema_1 = __importDefault(require("../schemas/prova_insert_schema"));
const provaRoutes = (0, express_1.Router)();
provaRoutes.post("/prova", validate_token_1.validateToken, (0, validate_schema_1.validateSchema)(prova_insert_schema_1.default), test_controller_1.createTest);
provaRoutes.get("/prova", validate_token_1.validateToken, test_controller_1.read);
exports.default = provaRoutes;
