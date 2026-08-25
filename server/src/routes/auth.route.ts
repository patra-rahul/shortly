import { Router } from "express";
import * as controller from "../controllers/auth.controller";
const authRouter = Router();


authRouter.post("/register", controller.register);


/**
 * SIGN IN WITH GOOGLE ACCOUNT
 */
authRouter.get("/google", controller.google);
authRouter.get("/google/callback", controller.googleCallback);
authRouter.get("/logout", controller.logout);

export default authRouter;
