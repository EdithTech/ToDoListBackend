import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const TODOLIST_DB_URL = process.env.MONGO_URL;  

const connection = () => {  

    mongoose.connect(TODOLIST_DB_URL);

    const db = mongoose.connection;

    db.on("connected", () => {
        console.log("Database Connected Succesfully", TODOLIST_DB_URL);
    })
    db.on("disconnected", () => {
        console.log("Database Disconnected");
    })
    db.on("error", (error) => {
        console.log("Error", error.message);
    })

}

export default connection;