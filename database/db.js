import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const TODOLIST_DB_URL = process.env.MONGO_URL;

const connection = (app) => {  

    mongoose.connect(TODOLIST_DB_URL);

    const db = mongoose.connection;

    db.on("connected", () => {
        const port = process.env.PORT || 3000; 
        app.listen(port, () => console.log(`Server is running on the ${port}`))
        console.log("Database Connected Succesfully");
    })
    db.on("disconnected", () => {
        console.log("Database Disconnected");
    })
    db.on("error", (error) => {
        console.log("Error", error.message);
    })

}

export default connection;