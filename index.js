const express = require('express')
const app=express()
const dotenv= require('dotenv').config()
const PORT=process.env.PORT|| 3000
const connect= require('./config/dbConnect')


const userRouter= require('./routes/users/userRoutes')
const postRouter=require('./routes/posts/postRoutes')
const commentRouter=require('./routes/comments/commentRoutes')
const categoryRouter=require('./routes/categories/categoryRoutes')
const globalErrHandler = require('./middlewares/globalErrHandler')
const isAdmin = require('./middlewares/isAdmin')



//middlewares
app.use(express.json()) //to pass incoming payload (from req.body)

//Home Route
app.get('/',async(req,res)=>{
    try{
        const posts= await Post.find()
        res.json({
            status:"Success",
            data:posts,
        })
    }
    catch (error){
        res.json(error)
    }
})

//users route
app.use('/app/v1/users/',userRouter)

//posts route
app.use('/app/v1/posts/',postRouter)

//comments route
app.use('/app/v1/comments',commentRouter)

//categories route
app.use('/app/v1/categories',categoryRouter)

//error hander middleware
app.use(globalErrHandler)


app.listen(PORT,()=>{
    console.log('server is up and running....')
    console.log("nodeon testing")
})
