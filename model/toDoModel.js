import { request } from "express";
import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    },

    isPinned:{
        type: Boolean,
        default: false
    },
    
    isDeleted:{
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const todo = mongoose.model('todo', toDoSchema);

export default todo;


