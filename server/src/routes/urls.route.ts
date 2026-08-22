import { Router } from "express";
import * as urlController from "../controllers/urls.controller";

const urlRouter = Router();

/**
 * POST /api/v1/urls --> to create a new url from originalUrl
 */
urlRouter.post("/urls", urlController.urls);

export default urlRouter;