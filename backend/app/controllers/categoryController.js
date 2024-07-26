const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const Categories = require('../models/Categories')

// /categories
//GET /
exports.listCategories = async (req, res, next) => {
    try{
        const categories = await Categories.find({})
        res.json(new ApiResponse().setData('total', categories.length).setData('categories', categories))
    } catch(error) {
        next(error)
    }
}

//POST /
exports.addCategory = async (req, res, next) => {
    try{
        const category = new Categories(req.body)
        await category.save()
        res.json(new ApiResponse().setSuccess('Category added').setData('category', category))
    } catch(error) {
        next(error)
    }
}

//PUT /:categoryId
exports.updateCategory = async (req, res, next) => {
    try{
        const {categoryId} = req.params
        const category = await Categories.findOneAndUpdate({_id: categoryId}, req.body, {new: true})
        if (!category) throw new ApiError('Category not found', 404)
        res.json(new ApiResponse().setSuccess('Category updated').setData('category', category))
    } catch(error) {
        next(error)
    }
}

//DELETE /:categoryId
exports.deleteCategory = async (req, res, next) => {
    try{
        const {categoryId} = req.body 
        const category = await Categories.findOneAndDelete({_id: categoryId})
        if (!category) throw new ApiError('Category not found', 404)
        
        res.json(new ApiResponse().setSuccess('Category deleted').setData('category', category))
    } catch(error) {
        next(error)
    }
}