import jwt from 'jsonwebtoken'

export const verifySignIN = (req,res,next) => {
    console.log("Cookies ", req.cookies);
    const token = req.cookies.token;
    
    if(!token) return res.send({message: "No Token"});

    jwt.verify( token, process.env.JWT_SECRET_KEY2 , (err, decoded)=>{
        if(err) return res.status(401).send({message : "Invalid Token in verifySignIn middleware"});
        next();
    })
}