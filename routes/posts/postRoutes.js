const express= require('express')
const postRouter=express.Router()

postRouter.post('/',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post created",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

postRouter.get('/:id', async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post sucessfully fetched",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

postRouter.get('/', async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post list",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

postRouter.delete('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post deleted sucessfully",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

postRouter.put('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post updated sucessfylly",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

module.exports=postRouter