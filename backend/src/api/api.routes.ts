import { Router } from "express";
import * as controller from './api.controllers.js'

const api = Router();

api.post('/url', controller.createUrl);

export default api;