import express from "express"
import cors from "cors";
import connection from "./database/db.js"
import passport from "passport";
import toDoRoute from "./routes/toDoRoute.js";
import userRoute from "./routes/userRoute.js";
import { jwtAuthMiddleware } from "./jwt.js";

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// authentication
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res) => {
    res.send("Welcome to the To Do List App");
})

app.use('/todo', jwtAuthMiddleware, toDoRoute);
app.use('/user', userRoute);

connection();
const port = 3000
app.listen(port, () => console.log(`Server is running on the ${port}`))