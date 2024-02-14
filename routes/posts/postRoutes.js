const express= require('express')
const multer= require('multer')
const storage=require('../../config/cloudinary')
const { createpostCtrl,fetchPostsCtrl,toggleLikesPostCtrl,toggleDisLikesPostCtrl,deletePostCtrl,updatePostCtrl } = require('../../controllers/posts/postController')
const isLogin = require('../../middlewares/isLogin')
const postRouter=express.Router()

//file upload middleware
const upload=multer({storage})

postRouter.post('/',isLogin,upload.single("image"),createpostCtrl)

postRouter.get('/',isLogin, fetchPostsCtrl)

postRouter.get('/likes/:id',isLogin,toggleLikesPostCtrl )

postRouter.get('/dislikes/:id',isLogin,toggleDisLikesPostCtrl )

postRouter.delete('/:id',isLogin,deletePostCtrl)

postRouter.put('/:id',isLogin,upload.single("image"),updatePostCtrl)

module.exports=postRouter