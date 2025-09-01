import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDb from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express();
const port = process.env.PORT  || 4000;
connectDb()

const allowedOrigins = [
  process.env.FRONTEND_URL,  // e.g. "https://your-frontend.vercel.app"
  "http://localhost:5173"
].filter(Boolean); // removes undefined

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.get('/', (req,res) => {
  res.send('API IS WORKING')
})


// API ROUTES / ENDPOINT
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)





app.listen(port, ()=> console.log("Server Started on Port:", port))
