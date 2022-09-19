import {Router} from "express";
import { createTest, read } from "../controller/test_controller";
import { validateSchema } from "../middlewares/validate_schema";
import { validateToken } from "../middlewares/validate_token";
import provaInsertSchema from "../schemas/prova_insert_schema";

const provaRoutes = Router();

provaRoutes.post("/prova", validateToken, validateSchema(provaInsertSchema), createTest);
provaRoutes.get("/prova", validateToken, read);



export default provaRoutes;