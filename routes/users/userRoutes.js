const express=require('express')
const userRouter=express.Router()

const {userRegisterCtrl,userLoginCtrl,usersCtrl,userProfileCtrl,userDeleteCtrl,userUpdateCtrl,profilePhotoUploadCtrl,followingCtrl,unfollowCtrl,blockUserCtrl,unblockUserCtrl}=require("../../controllers/users/userController")
const isLogin= require('../../middlewares/isLogin')
const storage = require('../../config/cloudinary')
const multer= require('multer')

//instance of multer

const upload= multer({storage})

userRouter.post('/register', userRegisterCtrl)

userRouter.post('/login',userLoginCtrl)

userRouter.get('/',usersCtrl)

userRouter.get('/profile/',isLogin,userProfileCtrl)

userRouter.delete('/:id',userDeleteCtrl)

userRouter.put('/:id',userUpdateCtrl)

userRouter.get('/following/:id',isLogin,followingCtrl)

userRouter.get('/unfollow/:id',isLogin,unfollowCtrl)

userRouter.get('/block/:id',isLogin,blockUserCtrl)

userRouter.get('/unblock/:id',isLogin,unblockUserCtrl)

userRouter.post('/profile-photo-upload',isLogin,upload.single('profile'),profilePhotoUploadCtrl)

module.exports=userRouter