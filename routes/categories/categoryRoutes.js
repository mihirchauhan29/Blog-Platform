const express= require('express')
const{createCategoryCtrl,fetchCategoriesCtrl,categoryDetailsCtrl,updateCategoryCtrl,deleteCategoryCtrl}= require('../../controllers/categories/categoritesController')
const isLogin = require('../../middlewares/isLogin')


const categoryRouter=express.Router()

categoryRouter.post('/',isLogin,createCategoryCtrl)

categoryRouter.get('/:id',categoryDetailsCtrl)

categoryRouter.get('/',fetchCategoriesCtrl)

categoryRouter.delete('/:id',isLogin,deleteCategoryCtrl)

categoryRouter.put('/:id',isLogin,updateCategoryCtrl)

module.exports= categoryRouter