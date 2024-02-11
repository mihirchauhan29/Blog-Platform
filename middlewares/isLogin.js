const errMsg = require('../utils/errMsg')
const getTokenFromHeader = require('../utils/getTokenFromHeader')
const verifyToken= require('../utils/verifyToken')

const isLogin= (req,res,next)=>{

    //get token from header
    const token= getTokenFromHeader(req)

    //verify token
    const decodedUser=verifyToken(token)

    // save the user

    req.userAuth= decodedUser.id
    if(!decodedUser){
       return next(errMsg("Invalid Token",500))
    }else{
        next()
    }
}

module.exports=isLogin