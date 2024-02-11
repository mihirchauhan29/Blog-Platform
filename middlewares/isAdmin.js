const User = require('../model/User/User')
const errMsg = require('../utils/errMsg')
const getTokenFromHeader = require('../utils/getTokenFromHeader')
const verifyToken= require('../utils/verifyToken')


const isAdmin= async(req,res,next)=>{

    //get token from header
    const token= getTokenFromHeader(req)

    //verify token
    const decodedUser=verifyToken(token)

    // save the user

    req.userAuth= decodedUser.id

    //find the user in database
    const user=await User.findById(decodedUser.id)
    //check if admin

    if(user.isAdmin){
        return next()
    }else {
        return next(errMsg("Access Denied",403))
    }

}

module.exports=isAdmin