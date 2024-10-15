const jwt = require("jsonwebtoken");


async function jwthandler(token){
    
    try {
        const decoded = jwt.verify(token, process.env.tokenSecret);
        if(!decoded){
            res.status(400).json({message:"Invalid Token"})
        }
       return {id:decoded.id,scope:decoded.scope}
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Token Verification Failed"})
    }
}

module.exports=jwthandler;