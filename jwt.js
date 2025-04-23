const jwtToken  = require('jsonwebtoken');

const jwtAuthMiddelware = (req,res,next)=>{

    const auth = req.headers.authorization;
    if(!auth){
        return res.status(401).json({message:"token not found"});
    }

    //ye req.headers se token extract karega 
    const token  = req.headers.authorization.split(' ')[1];
    console.log("token is:",token);
    
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    try {
        //verify token
        const decodes = jwtToken.verify(token,process.env.JWT_SECRET);
        req.user = decodes;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"unauthorized"});
    }
}

const generateToken  = (userData)=>{
    //ye token generate karega
    const genToken = jwtToken.sign(userData,process.env.JWT_SECRET);
    return  genToken;
}

module.exports = {jwtAuthMiddelware,generateToken};
//ye dono function export kiye hain taaki hum inhe kisi aur file main use kar sake