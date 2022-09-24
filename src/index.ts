import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";
import provaRoutes from "./routes/prova_routes";
import dotenv from "dotenv";
import server from "./app";
dotenv.config();






server.listen(process.env.PORT || 5000, () => {
    console.log(process.env.NODE_ENV);
    console.log("Server running!");
})