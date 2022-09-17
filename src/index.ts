import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";
import provaRoutes from "./routes/prova_routes";

const server = express();


server.use(cors());
server.use(express.json());
server.use(userRoutes);
server.use(provaRoutes);


server.listen(5000, () => {
    console.log("Server running!");
})