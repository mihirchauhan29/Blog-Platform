const express=require('express')
const userRouter=express.Router()

const {userRegisterCtrl,userLoginCtrl,usersCtrl,userProfileCtrl,userDeleteCtrl,userUpdateCtrl,profilePhotoUploadCtrl,followingCtrl,unfollowCtrl,blockUserCtrl,unblockUserCtrl, updatePasswordCtrl}=require("../../controllers/users/userController")
const isLogin= require('../../middlewares/isLogin')
const storage = require('../../config/cloudinary')
const multer= require('multer')

//instance of multer

const upload= multer({storage})

userRouter.post('/register', userRegisterCtrl)

userRouter.post('/login',userLoginCtrl)

userRouter.get('/',usersCtrl)

userRouter.get('/profile/',isLogin,userProfileCtrl)

userRouter.delete('/delete-account',isLogin,userDeleteCtrl)

userRouter.put('/',isLogin,userUpdateCtrl)

userRouter.get('/following/:id',isLogin,followingCtrl)

userRouter.get('/unfollow/:id',isLogin,unfollowCtrl)

userRouter.get('/block/:id',isLogin,blockUserCtrl)

userRouter.get('/unblock/:id',isLogin,unblockUserCtrl)

userRouter.put('/update-password',isLogin,updatePasswordCtrl)

userRouter.post('/profile-photo-upload',isLogin,upload.single('profile'),profilePhotoUploadCtrl)

module.exports=userRouter