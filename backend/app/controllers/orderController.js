const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Orders = require("../models/Orders");
const Carts = require("../models/Carts");
const { listOrdersByUserId } = require("../utils/orderAggregate");
const { sendMail } = require("../utils/MailService");

// /orders/
//GET /
exports.myOrders = async (req, res, next) => {
    try {
        const { tab } = req.query;
        const { _id, isAdmin } = req.user;
        const consideredId = isAdmin ? "" : _id;
        const orders = await listOrdersByUserId(consideredId, tab);

        const idFilter = isAdmin ? {} : { userId: _id };
        const tabsInfo = {};
        tabsInfo.all = await Orders.countDocuments(idFilter);
        tabsInfo.waiting = await Orders.countDocuments({
            ...idFilter,
            isDone: false,
            isExpired: false,
            isReady: false,
        });
        tabsInfo.ready = await Orders.countDocuments({
            ...idFilter,
            isReady: true,
            isDone: false,
            isExpired: false,
        });
        tabsInfo.done = await Orders.countDocuments({
            ...idFilter,
            isDone: true,
        });
        tabsInfo.expired = await Orders.countDocuments({
            ...idFilter,
            isExpired: true,
        });

        res.json(
            new ApiResponse()
                .setData("orders", orders)
                .setData("tabsInfo", tabsInfo)
        );
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

        res.json(new ApiResponse().setData("serveDates", filteredServeDates));
    } catch (error) {
        next(error);
    }
};

//POST /
exports.addMyOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const carts = await Carts.find({ userId: userId }).populate(
            "foodId",
            "name"
        );
        if (carts.length === 0) throw new ApiError("Cart is empty", 400);

        let listFood = "";
        const foodIds = carts.map((item, index) => {
            listFood += `${index + 1}: ${item.foodId.name}`;
            return item.foodId._id;
        });
        const order = new Orders({ ...req.body, userId, foodIds });
        await order.save();

        await Carts.deleteMany({});

        //send email after order successfully
        await sendMail(
            "sosvanish@gmail.com",
            "Đơn hàng mới cho bé iu",
            "Nhanh tay kiểm tra đơn hàng mới nào: \n" + listFood
        );

        res.json(
            new ApiResponse()
                .setSuccess("Ordered successfully")
                .setData("order", order)
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
        if (!order) throw new ApiError("Order not found", 404);

        const orders = await listOrdersByUserId(req.user._id);

        res.json(
            new ApiResponse()
                .setSuccess("Order canceled")
                .setData("orders", orders)
        );
    } catch (error) {
        next(error);
    }
};

//PATCH /:orderId/ready
exports.setReadyOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.findOneAndUpdate(
            { _id: orderId, isReady: false },
            { isReady: true }
        );
        if (!order) throw new ApiError("Order not found", 404);

        res.json(new ApiResponse().setSuccess("Order set to ready"));
    } catch (error) {
        next(error);
    }
};

//PATCH /:orderId/done
exports.setDoneOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.findOneAndUpdate(
            { _id: orderId, isDone: false },
            { isDone: true }
        );
        if (!order) throw new ApiError("Order not found", 404);

        res.json(new ApiResponse().setSuccess("Order set to done"));
    } catch (error) {
        next(error);
    }
};
