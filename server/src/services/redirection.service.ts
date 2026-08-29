import { Router } from "express";
import { redirectUrl } from "../controllers/service.controller";

const serviceRouter = Router();

serviceRouter.get("/:id", redirectUrl);

export default serviceRouter;
