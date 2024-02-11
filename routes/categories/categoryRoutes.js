const express= require('express')

const categoryRouter=express.Router()

categoryRouter.post('/',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"category created",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

categoryRouter.get('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Category sucessfully fetched",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

categoryRouter.delete('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Category deleted sucessfully",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

categoryRouter.put('/:id',async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Category updated sucessfylly",
        })
        
    } catch (error) {
        res.json(error.message)
    }
})

module.exports= categoryRouter