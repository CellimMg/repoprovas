import { Router } from "express";
import { createUser } from "../controller/user_controller";
import { validateSchema } from "../middlewares/validate_schema";
import userInsertSchema from "../schemas/user_insert_schema";


const userRoutes = Router();


userRoutes.post("/signUp", validateSchema(userInsertSchema), createUser);


export default userRoutes;