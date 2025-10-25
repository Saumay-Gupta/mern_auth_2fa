import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function handleSignIN(req,res){
    const {fistName, email, password} = req.body;

    const findUser = await User.findOne({email : email});
    if(findUser) return res.send({message:"Email already registered"});
    
    const saltrounds = 10

    const hashedPass = await bcrypt.hash(password, saltrounds);

    const newUser = new User({
        name: fistName,
        email: email,
        password: hashedPass,
    })

    await newUser.save();

   const token = jwt.sign({ email: findUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",   // crucial for cross-origin cookie
        path: "/",          // makes it available on all routes
        maxAge: 3600000,
    });

    return res.status(200).send({message: "SignIN Successfully", token : token});
}

export async function handleSignUP(req,res){
    const {email, password} = req.body;

    const findUser = await User.findOne({email : email});
    if(!findUser) return res.send({message:"Email not registered"});
    
    const verifyUser = await bcrypt.compare(password, findUser.password);

    if(!verifyUser) return res.send({message:"Either the email or the password is wrong !!!"});

    const token = jwt.sign({ email: findUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",   // crucial for cross-origin cookie
        path: "/",          // makes it available on all routes
        maxAge: 3600000,
    });

    return res.status(200).send({message: "Login Successfully", token : token});
}


