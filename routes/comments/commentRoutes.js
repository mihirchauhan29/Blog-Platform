const express= require('express')
const commentRouter=express.Router()

commentRouter.post('/', async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"comment created",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

commentRouter.get('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Comment sucessfully fetched",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

commentRouter.delete('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Comment deleted sucessfully",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

commentRouter.put('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Comment updated sucessfylly",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})


module.exports=commentRouter