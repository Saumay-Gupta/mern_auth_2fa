import User from "../models/user.js"
import bcrypt from 'bcrypt'

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

    return res.status(200).end();
}

export async function handleSignUP(req,res){
    const {email, password} = req.body;

    const findUser = await User.findOne({email : email});
    if(!findUser) return res.send({message:"Email not registered"});
    
    const verifyUser = await bcrypt.compare(password, findUser.password);

    if(!verifyUser) return res.send({message:"Either the email or the password is wrong !!!"});

    return res.status(200).end();
}


