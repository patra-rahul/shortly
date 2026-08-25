import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/authorization.middleware";
const authRouter = Router();


authRouter.post("/register", controller.register);


/**
 * SIGN IN WITH GOOGLE ACCOUNT
 */
authRouter.get("/google", controller.google);
authRouter.get("/google/callback", controller.googleCallback);
authRouter.get("/logout", controller.logout);
authRouter.get("/me", requireAuth , controller.getMe);

export default authRouter;
