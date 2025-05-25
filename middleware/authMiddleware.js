const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.verifyLoggedInUser = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'Access denied!'});
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}