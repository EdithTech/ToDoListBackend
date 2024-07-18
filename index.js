import express from "express"
import cors from "cors";
import connection from "./database/db.js"
import Routes from "./routes/route.js"

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(Routes);

// app.post('/', Routes);
// app.get('/', Routes);

// app.get("/hello", (req, res) => {
//   res.send("hello");
// })

connection();
const port = 3000
app.listen(port, () => console.log(`Server is running on the ${port}`))