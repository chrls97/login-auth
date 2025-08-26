import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDb from "./config/mongodb.js"

const app = express();
const port = process.env.PORT  || 4000;
connectDb()


app.use(express.json())
app.use(cookieParser());
app.use(cors({credentials: true}));


app.get('/', (req,res) => {
  res.send('API IS WORKawdawdING')
})


app.listen(port, ()=> console.log("Server Started on Port:", port))
