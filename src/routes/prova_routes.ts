import {Router} from "express";
import { createProva } from "../controller/prova_controller";
import { validateSchema } from "../middlewares/validate_schema";
import { validateToken } from "../middlewares/validate_token";
import provaInsertSchema from "../schemas/prova_insert_schema";

const provaRoutes = Router();

provaRoutes.post("/prova", validateToken, validateSchema(provaInsertSchema), createProva);


export default provaRoutes;