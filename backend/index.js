import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./db/connectDB.js";
import { handleSignIN, handleSignUP } from "./controllers/user.js";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

connectDB();

app.get('/', (req,res)=>{
    res.send("Hello");
})

app.post('/signIN', handleSignIN)
app.post('/signUP', handleSignUP)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT: ${process.env.PORT}`);
})