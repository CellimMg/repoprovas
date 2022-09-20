"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const prova_routes_1 = __importDefault(require("./routes/prova_routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(user_routes_1.default);
server.use(prova_routes_1.default);
server.listen(process.env.PORT || 5000, () => {
    console.log("Server running!");
});
