import express from "express";
import {addToDo, deleteToDo, getAllToDos, toggleToDoDone, updateToDo} from "../controller/toDo.js";

const route = express.Router();


route.get('/getAllToDos', getAllToDos);
route.post('/addToDo', addToDo);
route.post('/toggleToDoDone/:id', toggleToDoDone);
route.post('/updateToDo/:id', updateToDo);
route.post('/deleteToDo/:id', deleteToDo);


export default route;