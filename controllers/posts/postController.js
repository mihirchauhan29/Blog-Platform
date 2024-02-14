const Post = require("../../model/Post/Post")
const User= require("../../model/User/User")
const Category= require("../../model/Category/Category")
const errMsg= require("../../utils/errMsg")

//create post
const createpostCtrl=async(req,res,next)=>{
    const {title,description,category}= req.body
    try {
        //find the user
        const author= await User.findById(req.userAuth)

        //create the post
        const postCreated= await Post.create({
            title,
            description,
            user: author._id,
            category,
            photo: req?.file?.path,
        })

        author.posts.push(postCreated)

        //save
        await author.save()

        res.json({
            status:"success",
            data:postCreated,
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

const fetchPostsCtrl= async(req,res,next)=>{
    try {
        //find all posts
        const posts= await Post.find({}).populate("user").populate("category",'title')

        //check if the user is blocked by the post owner
        const filterdPosts=posts.filter(post=>{
            //get all blocked users
            const blockedUsers=post.user.blocked
            const isBlocked=blockedUsers.includes(req.userAuth)

            return isBlocked ? null : post
        })

        res.json({
            status:"success",
            data:filterdPosts,
        })
        
    } catch (error) {
       return next(errMsg(error.message))
    }
}

//likes
const toggleLikesPostCtrl=async(req,res,next)=>{
    try {
        //get the post
        const post= await Post.findById(req.params.id)
        //check if  the user has already liked the post
        const isLiked=post.likes.includes(req.userAuth)
        //if the user has already liked the post,unlike the post
        if(isLiked){
            post.likes=post.likes.filter(like => like.toString() !== req.userAuth.toString())
            await post.save()
        }else {
            //if the user has not liked the post,like the post
            post.likes.push(req.userAuth)
            await post.save()
        }
        res.json({
            status:"success",
            data:post,
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//dislikes
const toggleDisLikesPostCtrl=async(req,res,next)=>{
    try {
        //get the post
        const post= await Post.findById(req.params.id)
        //check if  the user has already disliked the post
        const isDisLiked=post.disLikes.includes(req.userAuth)
        //if the user has already liked the post,unlike the post
        if(isDisLiked){
            post.disLikes=post.disLikes.filter(dislike => dislike.toString() !== req.userAuth.toString())
            await post.save()
        }else {
            //if the user has not liked the post,like the post
            post.disLikes.push(req.userAuth)
            await post.save()
        }
        res.json({
            status:"success",
            data:"You dislike the post",
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//delete the post
const deletePostCtrl=async(req,res,next)=>{
    try {
        //find the post
        const post=await Post.findById(req.params.id)
        if(post.user.toString() !== req.userAuth.toString()){
            return next(errMsg("You are not allowed delete this post",403))
        }
        await Post.findByIdAndDelete(req.params.id)
        res.json({
            status:"success",
            data:"Post deleted sucessfully",
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//update the  post
const updatePostCtrl=async(req,res,next)=>{
    const{title,description,category}=req.body
    try {
        //find the post
        const post=await Post.findById(req.params.id)
        if(post.user.toString() !== req.userAuth.toString()){
            return next(errMsg("You are not allowed update this post",403))
        }
        await Post.findByIdAndUpdate(req.params.id,{
            title,
            description,
            category,
            photo:req?.file?.path,
        },{
            new:true,
        })
        res.json({
            status:"success",
            data:"Post updated sucessfully",
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}




module.exports={
    createpostCtrl,
    fetchPostsCtrl,
    toggleLikesPostCtrl,
    toggleDisLikesPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
}