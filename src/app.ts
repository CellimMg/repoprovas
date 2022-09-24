import cors from "cors";
import express from "express";
import provaRoutes from "./routes/prova_routes";
import userRoutes from "./routes/user_routes";

const server = express();
server.use(cors());
server.use(express.json());
server.use(userRoutes);
server.use(provaRoutes);

export default server;