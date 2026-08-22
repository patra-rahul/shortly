import { Router } from "express";
import * as urlController from "../controllers/urls.controller";

const urlRouter = Router();

/**
 * POST /api/v1/urls --> to create a new url from originalUrl
 */
urlRouter.post("/urls", urlController.urls);

/**
 * GET /api/v1/urls/:id --> to get an already created shortUrl
 */
urlRouter.get('/urls/:id', urlController.getUrl);

/**
 * GET /api/v1/urls --> to get all urls with pagination feature
 */
urlRouter.get('/urls', urlController.getUrls);

/**
 * PATCH /api/v1/urls/:id --> to update existing url
 */
urlRouter.patch('/urls/:id', urlController.updateUrl);

/**
 * DELETE /api/v1/urls/:id --> to delete any exisiting url
 */
urlRouter.delete('/urls/:id', urlController.deleteUrl);

export default urlRouter;