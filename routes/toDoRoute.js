import express from "express";
import passport from "../auth.js";
import {addToDo, deleteToDo, getAllToDos, pinUnpinToDo, toggleToDoDone, updateToDo} from "../controller/toDo.js";

const route = express.Router();

route.get('/getAllToDos', getAllToDos);

route.post('/addToDo',addToDo);
route.post('/toggleToDoDone/:id',toggleToDoDone);
route.post('/updateToDo/:id',updateToDo);
route.post('/deleteToDo/:id',deleteToDo);
route.post('/pin-unpin/:id',pinUnpinToDo);

export default route;