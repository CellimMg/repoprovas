import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";
import provaRoutes from "./routes/prova_routes";
import dotenv from "dotenv";
dotenv.config();
const server = express();


server.use(cors());
server.use(express.json());
server.use(userRoutes);
server.use(provaRoutes);


server.listen(process.env.PORT || 5000, () => {
    console.log("Server running!");
})