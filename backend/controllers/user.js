import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import mailVerify from "../models/mailVerification.js";

export async function handleSignIN(req,res){
    const { password } = req.body;
    const { token } = req.cookies;

    if(!token){
        return res.send({message: "Session Expired by token in handleSignIN"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY2);
    const email = decoded.email

    const findEmail = await mailVerify.findOne({email: email});
    if(!findEmail || !findEmail.verified) return res.send({message: "Session Expired by email in handleSignIN"});

    const findUser = await User.findOne({email : email});
    if(findUser) return res.send({message:"Email already registered"});
    
    const saltrounds = 10

    const hashedPass = await bcrypt.hash(password, saltrounds);

    const newUser = new User({
        email: email,
        password: hashedPass,
    })

    await newUser.save();

    // TOKEN2
   const token2 = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie("token", token2, {
        httpOnly: true,
        secure: true,
        sameSite: "None",   // crucial for cross-origin cookie
        path: "/",          // makes it available on all routes
        maxAge: 3600000,
    });

    await mailVerify.deleteOne({ email: email });
    
    return res.status(200).send({message: "SignIN Successfully", token : token2});
}

export async function handleSignUP(req,res){
    
    try{

        const {token} = req.cookies
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY2);
        const email = decoded.email;
    
        const token2 = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        res.cookie("token", token2, {
            httpOnly: true,
            secure: true,
            sameSite: "None",   // crucial for cross-origin cookie
            path: "/",          // makes it available on all routes
            maxAge: 3600000,
        });
        
        return res.send({message: "Login Succesfully"});
    }
    catch(err){
        console.log({message: "Error In handleSignUp"});
    }
}


export async function handleVerifyOTP(req,res){

    const {otp} = req.body;
    const {token} = req.cookies

    if(!token){
        return res.send("No Token Provided during OTP verification");
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY2);
        const email = decoded.email;

        const verifyEmail = await mailVerify.findOne({email: email});
        if(!verifyEmail) return res.send({message: "Session Expired handleVerifyOTP"});

        if(verifyEmail.otp !== otp) return res.send({message: "Wrong OTP inserted handleVerifyOTP"});

        verifyEmail.verified = true

        await verifyEmail.save();

        return res.send({message: 'OTP VERIFIED SUCCESSFULLY'});
    }
    catch(err){
        return res.send({message: "Error in handleVerifyOTP backend"});
    }
}

export async function handleSendOTP(req,res){
    const {email} = req.body;

    const findUser = await User.findOne({email: email})
    if(findUser) return res.send({message: "Email Already Registered, go for Login"})
    
    // generate otp -- 
    const otp = Math.floor(1000+ Math.random()*9000).toString();

    const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY2, {expiresIn: '5m'});

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",   // crucial for cross-origin cookie
        path: "/",          // makes it available on all routes
        maxAge: 300000,
    });

    const newMail = new mailVerify({
        email:email,
        otp: otp,
    })
    
    await newMail.save();

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"Inspiredly" <Inspired@email>',
            to: email,
            subject: "One-Time-Password for Email Verification",
            text: otp,
            html: `<b>Your OTP is: ${otp}</b>`, // Bonus: Actually send the OTP in the HTML
        });

        console.log("Message sent:", info.messageId);

        return res.status(200).send({ message: "OTP sent to your email. Please verify." });
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).send({ message: "Error sending verification email." });
    }
}

export async function handleSendOTP2(req,res){
    const {email,password} = req.body;

    const findUser = await User.findOne({email : email});
    if(!findUser) return res.send({message:"Email not registered"});
    
    const verifyUser = await bcrypt.compare(password, findUser.password);

    if(!verifyUser) return res.send({message:"Either the email or the password is wrong !!!"});
    
    // generate otp -- 
    const otp = Math.floor(1000+ Math.random()*9000).toString();

    const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY2, {expiresIn: '5m'});

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",   // crucial for cross-origin cookie
        path: "/",          // makes it available on all routes
        maxAge: 300000,
    });

    const newMail = new mailVerify({
        email:email,
        otp: otp,
    })
    
    await newMail.save();

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"Inspiredly" <Inspired@email>',
            to: email,
            subject: "One-Time-Password for Email Verification",
            text: otp,
            html: `<b>Your OTP is: ${otp}</b>`, // Bonus: Actually send the OTP in the HTML
        });

        console.log("Message sent:", info.messageId);

        return res.status(200).send({ message: "OTP sent to your email. Please verify." });
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).send({ message: "Error sending verification email." });
    }
}

