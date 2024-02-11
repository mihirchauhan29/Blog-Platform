const bcrypt= require('bcryptjs')
const User= require("../../model/User/User")
const generateToken= require('../../utils/generateToken')
const getTokenFromHeader= require('../../utils/getTokenFromHeader')
const errMsg = require('../../utils/errMsg')


//register user
const userRegisterCtrl=async(req,res,next)=>{

    const{firstname,lastname,profilephoto,email,password}= req.body

    try {
//check email exist or not
        const userFound= await User.findOne({email})
        if(userFound){
            return next(errMsg("User Already Exist",500))
        }
//hash the password
const hashedPassword=await bcrypt.hash(password,10)
//create the user
 const user= await User.create({
    firstname,
    lastname,
    email,
    password:hashedPassword,
 })
        res.json({
            status:"success",
            data:user,
        })
        
    } catch (error) {
        next(errMsg(error.message))
    }
}

//login 
const userLoginCtrl=async(req,res)=>{
    const {email,password}= req.body
    try {
        //check if email exist 
        const userFound= await User.findOne({email})
        
        //verify the pasword
        const isPasswordMatched= await bcrypt.compare(password,userFound.password)

        if(!userFound || !isPasswordMatched){
            return res.json({
                msg:"Invalid Login Credentials"
            })
        }

        res.json({
            status:"success",
            data:{
                firstname:userFound.firstname,
                lastname:userFound.lastname,
                email:userFound.email,
                isAdmin:userFound.isAdmin,
                token: generateToken(userFound._id)
            },
        })
        
    } catch (error) {
        res.json(error.message)
    }
}

//following
const followingCtrl=async(req,res,next)=>{
    try {
        //find the user to follow
        const userToFollow= await User.findById(req.params.id)
        //find the user who is following
        const userWhoFollowed= await User.findById(req.userAuth)

        //check if user and userWhoFollowed are found
        if(userToFollow && userWhoFollowed){
            //check if userWhoFollowed is already in the user's following list
            const isUserAlreadyFollowed= userToFollow.following.find(
                follower=> follower.toString() === userWhoFollowed._id.toString()
            )
          if(isUserAlreadyFollowed){
            return next(errMsg("You are already following this user"))
          }else{
            //push userwhofollowed nto the user's followers list
            userToFollow.followers.push(userWhoFollowed._id)
            //push usertofollow to the userwhofollowed's following list
            userWhoFollowed.following.push(userToFollow._id)

            //save
            await userToFollow.save()
            await userWhoFollowed.save()
            res.json({
                status:"success",
                data:"you have successfully followed this user",
            })
          }
        }
       
        
    } catch (error) {
        res.json(error.message)
    }
}

//unfollow
const unfollowCtrl=async(req,res,next)=>{
    try {
        //find the user to unfollow
        const userToBeUnfollowed= await User.findById(req.params.id)
        //find the user who is unfollowing
        const userWhoUnFollowed=await User.findById(req.userAuth)
        //check if user and userwhounfollowed ar found
        if(userToBeUnfollowed && userWhoUnFollowed){
            //check uf userwhounfollowed is already in user's followers list
            const isUserAlreadyFollowed=userToBeUnfollowed.followers.find(
                follower=> follower.toString() === userWhoUnFollowed._id.toString()
            )
            if(!isUserAlreadyFollowed){
                return next(errMsg("You have not followed this user"))
            }else{
                //remove userwhounfollowed from the users's followers list
                userToBeUnfollowed.followers= userToBeUnfollowed.followers.filter(
                    follower=> follower.toString() !== userWhoUnFollowed._id.toString()
                )

                //save
                await userToBeUnfollowed.save()
                //remove usertobeunfollowed from the userwhounfollowed's following list
                userWhoUnFollowed.following= userWhoUnFollowed.following.filter(
                    following=> following.toString() !== userToBeUnfollowed._id.toString()
                )

                //save the user
                await userWhoUnFollowed.save()
                res.json({
                    status:"success",
                    data:"You have successfully unfollowed this user",
                })
            }
        }

        
        
    } catch (error) {
        res.json(error.message)
    }
}

//block the user
const blockUserCtrl=async(req,res,next)=>{
    try {
        //find the user to be blocked
        const userToBeBlocked= await User.findById(req.params.id)
        //find the user who is blocking
        const userWhoBlocked= await User.findById(req.userAuth)
        //check if usertobeblocked and userwhoblocked are found
        if(userWhoBlocked && userToBeBlocked){
            //check if userwhoblocked is already in the  user's blockd list
            const isUserAlreadyBlocked=userWhoBlocked.blocked.find(
                blocked=> blocked.toString() === userToBeBlocked._id.toString()
            )
            if(isUserAlreadyBlocked){
                return next(errMsg("You already blocked this user"))
            }
            //push usertobeblocked to the userwhoblocked's blocked list
            userWhoBlocked.blocked.push(userToBeBlocked._id)

            //save
            await userWhoBlocked.save()
            res.json({
                status:"success",
                data:"Blocked Successfully",
            })
        }

       
        
    } catch (error) {
        res.json(error.message)
    }
}

//unblock the user 
const unblockUserCtrl=async(req,res,next)=>{
    try {

        //find the user to be unblocked
        const userToBeUnBlocked= await User.findById(req.params.id)
        //find the user who is unblocking
        const userWhoUnBlocked= await User.findById(req.userAuth)
        //check if usertobeunblocked and userwhounblocked are found
        if(userWhoUnBlocked && userToBeUnBlocked){
            //check if userwhounblocked is already in the  user's unblockd list
            const isUserAlreadyBlocked=userWhoUnBlocked.blocked.find(
                blocked=> blocked.toString() === userToBeUnBlocked._id.toString()
            )
            if(!isUserAlreadyBlocked){
                return next(errMsg("You have not blocked this user"))
            }
            //remove the usertobeunblocked from main user
            userWhoUnBlocked.blocked=userWhoUnBlocked.blocked.filter(
                blocked=>blocked.toString() !== userToBeUnBlocked._id.toString()
            )

            //save
            await userWhoUnBlocked.save()
        res.json({
            status:"success",
            data:"Unblocked successfully",
        })
        
    } }catch (error) {
        res.json(error.message)
    }
}

//all userslist
const usersCtrl=async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"User list",
        })
        
    } catch (error) {
        res.json(error.message)
    }
}

//profile
const userProfileCtrl=async(req,res)=>{
   
    try {

        //get token from header
       //console.log(token)
        const user= await User.findById(req.userAuth)
        res.json({
            status:"success",
            data:user,
        })
        
    } catch (error) {
        res.json(error.message)
    }
}

//delete user
const userDeleteCtrl=async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"User deleted sucessfully",
        })
        
    } catch (error) {
        res.json(error.message)
    }
}

//user Update
const userUpdateCtrl=async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"User updated sucessfully",
        })
        
    } catch (error) {
        res.json(error.message)
    }
}

//profile photo upload

const profilePhotoUploadCtrl=async(req,res,next)=>{
    
    try {
        //find the user to be updated
        const userToUpdate= await User.findById(req.userAuth)

        // check if user is found
        if(!userToUpdate){
            return next(errMsg('User not found',403))
        }

        // check if user is blocked
        if(userToUpdate.isBlocked){
            return next(errMsg('Action is not allowed',403))
        }
        // check if user is updating photo
        if(req.file){
            //update profile photo
            await User.findByIdAndUpdate(req.userAuth,{
                $set:{
                    profilephoto: req.file.path,
                },
            },
            {
                new: true,
            })
            res.json({
                status:"success",
                data:"Profile photo uploaded successfully",
            })
        }
        
        
    } catch (error) {
        next(errMsg(error.message,500))
    }
}


module.exports={
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl,
    followingCtrl,
    unfollowCtrl,
    blockUserCtrl,
    unblockUserCtrl,
}