const express= require('express')
const { createCommentCtrl,updateCommentCtrl,deleteCommentCtrl } = require('../../controllers/comments/commentController')
const isLogin = require('../../middlewares/isLogin')
const commentRouter=express.Router()


commentRouter.post('/:id',isLogin,createCommentCtrl )

commentRouter.delete('/:id',isLogin,deleteCommentCtrl)

commentRouter.put('/:id',isLogin,updateCommentCtrl)


module.exports=commentRouter