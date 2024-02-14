const Post = require("../../model/Post/Post")
const User= require("../../model/User/User")
const Category= require("../../model/Category/Category")
const Comment= require("../../model/Comment/Comment")
const errMsg= require("../../utils/errMsg")

//post comment
const createCommentCtrl=async(req,res,next)=>{
    const {description}= req.body
    try {
        //find the user
        const post=await Post.findById(req.params.id)
        //create comment
        const comment= await Comment.create({
            post: post._id,
            description,
            user: req.userAuth,
        })
        //push the  comment to  the post
        post.comments.push(comment._id)

        await post.save()

        res.json({
            status:"success",
            data:comment ,
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//delete comment
const deleteCommentCtrl=async(req,res,next)=>{
     try {
        const comment= await Comment.findById(req.params.id)
        if(comment.user.toString() !== req.userAuth.toString()){
            return next(errMsg("You are not allowed to delete comment"),403)
        }
        await Comment.findByIdAndDelete(req.params.id)
         res.json({
             status:"success",
             data:"comment deleted",
         })
     } catch (error) {
         return next(errMsg(error.message))
     }
 }

//update comment
const updateCommentCtrl=async(req,res,next)=>{
    const{description}= req.body
     try {
        const comment= await Comment.findById(req.params.id)
        if(comment.user.toString() !== req.userAuth.toString()){
            return next(errMsg("You are not allowed to update comment"),403)
        }
         const coment= await Comment.findByIdAndUpdate(req.params.id,{description},{
             new:true,
             runValidators:true,
         })
         res.json({
             status:"success",
             data:coment,
         })
     } catch (error) {
         return next(errMsg(error.message))
     }
 }

module.exports={
    createCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl,
}