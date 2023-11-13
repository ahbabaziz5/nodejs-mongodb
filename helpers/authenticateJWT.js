const sendResponse = require('./sendResponse')
var jwt = require('jsonwebtoken');
require('dotenv').config()


const authenticateJWT = (req,res,next) => {
const token = req.headers['authorization']?.split(' ')[1]
try {
    if(token){
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        console.log("decode>>>" , decoded);
        if(decoded){
            req.userId = decoded.data._id
        }
        next()
    }else{
        sendResponse(res, 403, null, 'User Not Found', true)
        next()
    }
    
    
} catch (error) {
    sendResponse(res, 403, null, 'Token Not Found', true)
    
}



}

module.exports = authenticateJWT