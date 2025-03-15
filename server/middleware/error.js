// MiddleWare to handle Errors

const errorHandler=(error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500).json({message : error.message || "An unknown error occured"});
}

module.exports ={
    errorHandler,
}