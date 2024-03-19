const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token = req.headers['x-access-token'];

    if(! token){
        return res.status(403).send("Token is required");
    }
    try{
        const decoded = jwt.verify(token, 'token');
        // missing
    }
    catch(err){
        res.status(401).send(err);
    }
    return next();
}

module.exports = verifyToken;