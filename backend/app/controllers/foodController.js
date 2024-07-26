const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const Foods = require('../models/Foods')

// /foods/
//GET /
exports.listFood = async (req, res, next) => {
    try{
        const {categoryId} = req.query
        const filter = {}
        if (categoryId) filter.categoryId = categoryId
        const page = req.query.page || 0
        const limit = req.query.limit || 9

        const foods = await Foods.find(filter)
            .skip(page * limit)
            .limit(limit)
        
        const total = await Foods.countDocuments(filter)

        res.json(
            new ApiResponse()
                .setData('total', total)
                .setData('limit', limit)
                .setData('page', page)
                .setData('foods', foods)
        )

    }catch(error){
        next(error)
    }
} 

//POST /
exports.addFood = async (req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
} 

//PUT /:foodId
exports.updateFood = async (req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
} 

//DELETE /:foodId
exports.deleteFood = async (req, res, next) => {
    try{
        const {foodId} = req.params
        const food = await Foods.findOneAndDelete({_id: foodId})
        if (!food) throw new ApiError('Food not found', 404)

        res.json(new ApiResponse().setSuccess('Food deleted'))
    }catch(error){
        next(error)
    }
} 