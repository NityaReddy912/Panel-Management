const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next) => {
    const token = req.headers['x-access-token'];

    if(! token){
        return res.status(403).send({err:"Token is required"});
    }
    try{
        await jwt.verify(token,'panel_management');
        return next();
    }
    catch(err){
        if(err.message === "jwt expired"){
            return res.status(401).send({err: "Token Expired"});
        }
        if(err.message === "invalid signature"){
            return res.status(401).send({err: "Invalid token"});
        }
    }
}

module.exports = verifyToken;