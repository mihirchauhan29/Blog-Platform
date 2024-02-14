const Category = require("../../model/Category/Category")
const errMsg = require("../../utils/errMsg")

//create
const createCategoryCtrl=async(req,res,next)=>{
    const {title}= req.body
    try {
        const category= await Category.create({title, user:req.userAuth})
        res.json({
            status:"success",
            data:category,
        })
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//fetch all categories
const fetchCategoriesCtrl=async(req,res,next)=>{
    
    try {
        const categories= await Category.find()
        res.json({
            status:"success",
            data:categories,
        })
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//fetch particular/single cateory
const categoryDetailsCtrl=async(req,res,next)=>{
   
    try {
        const category= await Category.findById(req.params.id)
        res.json({
            status:"success",
            data:category,
        })
    } catch (error) {
        return next(errMsg(error.message))
    }
}

//update
const updateCategoryCtrl=async(req,res,next)=>{
   const{title}= req.body
    try {
        const category= await Category.findByIdAndUpdate(req.params.id,{title},{
            new:true,
            runValidators:true,
        })
        res.json({
            status:"success",
            data:category,
        })
    } catch (error) {
        return next(errMsg(error.message))
    }
}

const deleteCategoryCtrl=async(req,res,next)=>{

    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({
            status:"success",
            message:"Category deleted sucessfully",
        })
        
    } catch (error) {
        return next(errMsg(error.message))
    }
}

module.exports={
    createCategoryCtrl,
    fetchCategoriesCtrl,
    categoryDetailsCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
}