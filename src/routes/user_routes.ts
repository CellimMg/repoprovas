import { Router } from "express";
import { createUser, signInUser } from "../controller/user_controller";
import { validateSchema } from "../middlewares/validate_schema";
import userInsertSchema from "../schemas/user_insert_schema";
import userSigninSchema from "../schemas/user_signin_schema";


const userRoutes = Router();


userRoutes.post("/signUp", validateSchema(userInsertSchema), createUser);
userRoutes.post("/signIn", validateSchema(userSigninSchema), signInUser);


export default userRoutes;