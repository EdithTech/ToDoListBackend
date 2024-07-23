import express from "express";
import passport from "../auth.js";
import {addUser, userLogin} from "../controller/user.js"
import { jwtAuthMiddleware } from "../jwt.js";

const route = express.Router();

route.post('/signup', addUser);
route.post('/login', userLogin);

export default route;