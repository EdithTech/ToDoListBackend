import express from "express";
import {addUser, userLogin} from "../controller/user.js"

const route = express.Router();

route.post('/signup', addUser);
route.post('/login', userLogin);

export default route;