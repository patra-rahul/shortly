import { Router } from "express";
import { redirectUrl } from "../controllers/app.controller";

const serviceRouter = Router();

serviceRouter.get('/:id', redirectUrl);

export default serviceRouter;