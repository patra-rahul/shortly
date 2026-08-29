import { Router } from "express";
import { requireAuth } from "../middlewares/authorization.middleware";
import * as controller from "../controllers/service.controller";

const appRouter = Router();

appRouter.get("/dashboard", requireAuth, controller.dashboard);

export default appRouter;
