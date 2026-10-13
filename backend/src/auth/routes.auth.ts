import { Router } from "express";
import * as controller from './controllers.auth.js'

const auth = Router();

auth.post('/register', controller.register);

export default auth;