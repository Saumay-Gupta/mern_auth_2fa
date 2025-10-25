import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./db/connectDB.js";
import { handleSignIN, handleSignUP } from "./controllers/user.js";
import cookieParser from "cookie-parser";
import { verifyUser } from "./middlewares/verifyUser.js";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

connectDB();

app.get('/', (req,res)=>{
    res.send("Hello");
})

app.post('/signIN', handleSignIN)
app.post('/signUP', handleSignUP)
app.get('/api/verify_user', verifyUser, (req,res)=>{
    res.set('Cache-Control', 'no-store');
    return res.status(200).send({message: "Valid Token"})
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT: ${process.env.PORT}`);
})