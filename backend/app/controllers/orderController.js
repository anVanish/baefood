const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Orders = require('../models/Orders');
const Carts = require('../models/Carts');
const { listOrdersByUserId } = require('../utils/orderAggregate');

// /orders/
//GET /
exports.myOrders = async (req, res, next) => {
    try {
        const { tab } = req.query;
        const orders = await listOrdersByUserId(req.user._id, tab);
        res.json(new ApiResponse().setData('orders', orders));
    } catch (error) {
        next(error);
    }
};

//GET /serveTime - breakfast 0 - 8, lunch 8 - 16, dinner 16 - 23
exports.getServeTime = async (req, res, next) => {
    try {
        const times = {
            breakfast: 8,
            lunch: 16,
            dinner: 23,
        };

        const day = parseInt(req.query.day) || 0;
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const currentHour = currentDate.getHours();

        const nextDate = new Date(
            currentYear,
            currentMonth,
            currentDay + day,
            0,
            0,
            0,
            0
        );

        const serveDates = {
            breakfast: null,
            lunch: null,
            dinner: null,
        };

        const breakfast = new Date(nextDate.setHours(times.breakfast));
        const lunch = new Date(nextDate.setHours(times.lunch));
        const dinner = new Date(nextDate.setHours(times.dinner));

        if (day === 0) {
            if (currentHour <= times.breakfast)
                serveDates.breakfast = breakfast;
            if (currentHour <= times.lunch) serveDates.lunch = lunch;
            serveDates.dinner = dinner;
        } else {
            serveDates.breakfast = breakfast;
            serveDates.lunch = lunch;
            serveDates.dinner = dinner;
        }

        //remove null item
        const filteredServeDates = Object.fromEntries(
            Object.entries(serveDates).filter(([key, value]) => value !== null)
        );

        res.json(new ApiResponse().setData('serveDates', filteredServeDates));
    } catch (error) {
        next(error);
    }
};

//POST /
exports.addMyOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const carts = await Carts.find({ userId: userId });
        if (carts.length === 0) throw new ApiError('Cart is empty', 400);

        const foodIds = carts.map((item) => {
            return item.foodId;
        });
        const order = new Orders({ ...req.body, userId, foodIds });
        await order.save();

        await Carts.deleteMany({});

        res.json(
            new ApiResponse()
                .setSuccess('Ordered successfully')
                .setData('order', order)
        );
    } catch (error) {
        next(error);
    }
};

//DELETE /:orderId
exports.deleteMyOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.findOneAndDelete({ _id: orderId });
        if (!order) throw new ApiError('Order not found', 404);

        const orders = await listOrdersByUserId(req.user._id);

        res.json(
            new ApiResponse()
                .setSuccess('Order canceled')
                .setData('orders', orders)
        );
    } catch (error) {
        next(error);
    }
};
