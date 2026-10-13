import { Router } from "express";
import * as controller from './controllers.auth.js'

const auth = Router();

auth.post('/register', controller.register);

auth.get('/login', controller.login);

export default auth;