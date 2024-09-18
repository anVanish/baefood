const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const Foods = require('../models/Foods');
const Carts = require('../models/Carts');

// /carts/
//GET /
exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const carts = await Carts.find({ userId }).populate(
            'foodId',
            'name description imageLink chef'
        );
        res.json(
            new ApiResponse()
                .setData('carts', carts)
                .setData('total', carts.length)
        );
    } catch (error) {
        next(error);
    }
};

//POST /:foodId
exports.addToCart = async (req, res, next) => {
    try {
        const { foodId } = req.params;
        const userId = req.user._id;
        const food = await Foods.findOne({ _id: foodId });
        if (!food) throw new ApiError('Food not found', 404);
        const foodInCart = await Carts.findOne({ userId, foodId });
        if (!foodInCart) await Carts.create({ userId, foodId });

        const carts = await Carts.find({ userId }).populate(
            'foodId',
            'name description imageLink chef'
        );
        res.json(
            new ApiResponse()
                .setData('carts', carts)
                .setData('cartCount', carts.length)
                .setSuccess('Food added to cart')
        );
    } catch (error) {
        next(error);
    }
};

//DELETE /:foodId
exports.deleteFromCart = async (req, res, next) => {
    try {
        const { foodId } = req.params;
        const userId = req.user._id;
        const cart = await Carts.findOneAndDelete({ foodId, userId });
        if (!cart) throw new ApiError('Food not found in cart', 404);

        const carts = await Carts.find({ userId }).populate(
            'foodId',
            'name description imageLink chef'
        );
        res.json(
            new ApiResponse()
                .setSuccess('Cart item deleted')
                .setData('carts', carts)
        );
    } catch (error) {
        next(error);
    }
};
