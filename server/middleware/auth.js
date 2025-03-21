const jwt = require("jsonwebtoken");
const HttpError = require('../models/Error');

const auth=async(req,res,next)=>{
    const Authorization=req.headers.Authorization || req.headers.authorization;
    if(Authorization && Authorization.startsWith("Bearer")){
        const token=Authorization.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,info)=>{
            if(err){
                return next(new HttpError("Invalid token, authorization denied.",403));
            }
            req.user=info;
            next();
        });
    }
    else{
        return next(new HttpError("Unauthorized. No token", 402));
    }
    
}

module.exports=auth;