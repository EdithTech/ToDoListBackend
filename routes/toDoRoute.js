import express from "express";
import {addToDo, deleteToDo, getToDos, pinUnpinToDo, toggleToDoDone, updateToDo} from "../controller/toDo.js";
import { jwtAuthMiddleware } from "../jwt.js";

const route = express.Router();

route.get('/getToDos', jwtAuthMiddleware, getToDos);

route.post('/addToDo', jwtAuthMiddleware, addToDo);
route.post('/toggleToDoDone/:id', jwtAuthMiddleware, toggleToDoDone);
route.post('/updateToDo/:id', jwtAuthMiddleware, updateToDo);
route.post('/deleteToDo/:id', jwtAuthMiddleware, deleteToDo);
route.post('/pin-unpin/:id', jwtAuthMiddleware, pinUnpinToDo);

export default route;