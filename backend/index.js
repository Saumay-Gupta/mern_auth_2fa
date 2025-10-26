import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import connectDB from "./db/connectDB.js";
import { handleSendOTP, handleSendOTP2, handleSignIN, handleSignUP, handleVerifyOTP } from "./controllers/user.js";
import cookieParser from "cookie-parser";
import { verifyUser } from "./middlewares/verifyUser.js";
import session from "express-session";
import { verifySignIN } from "./middlewares/verifySignIN.js";

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET, // A strong secret key in your .env
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,   // Must be true for sameSite: 'None'
        sameSite: 'None', // Required for cross-origin
        httpOnly: true,
        maxAge: 600000 // 10 minutes (to match OTP expiry)
    }
}))

connectDB();

app.get('/', (req,res)=>{
    res.send("Hello");
})

app.post('/signUP', handleSignUP)

app.post('/signIN', verifySignIN ,handleSignIN)
app.post('/verifyOTP', handleVerifyOTP)
app.post('/sendOTP', handleSendOTP)
app.post('/sendOTP2', handleSendOTP2)

app.get('/api/verify_user', verifyUser, (req,res)=>{
    res.set('Cache-Control', 'no-store');
    return res.status(200).send({message: "Valid Token"})
})


app.post('/logout', (req,res)=>{
    res.clearCookie('token',{
        httpOnly: true,
        sameSite: 'None',
        secure: true, 
    });
    res.status(200).send({ message: 'Logged out successfully'});
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT: ${process.env.PORT}`);
})