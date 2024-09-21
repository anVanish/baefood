const Orders = require('../models/Orders');
const mongoose = require('mongoose');

exports.listOrdersByUserId = async (userId, tab) => {
    try {
        const tabsOption = {
            all: {},
            waiting: { isDone: false, isExpired: false, isReady: false },
            ready: { isReady: true, isDone: false, isExpired: false },
            done: { isDone: true },
            expired: { isExpired: true },
        };

        const userOption = userId
            ? { userId: new mongoose.Types.ObjectId(userId) }
            : {};

        const orders = Orders.aggregate([
            {
                $match: {
                    ...userOption,
                    ...tabsOption[tab],
                },
            },
            { $unwind: '$foodIds' },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'foodIds',
                    foreignField: '_id',
                    as: 'foodIds',
                },
            },
            { $unwind: '$foodIds' },
            {
                $group: {
                    _id: '$_id',
                    userId: { $first: '$userId' },
                    serveDate: { $first: '$serveDate' },
                    serveTime: { $first: '$serveTime' },
                    note: { $first: '$note' },
                    foodIds: { $push: '$foodIds' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    isExpired: { $first: '$isExpired' },
                    isReady: { $first: '$isReady' },
                    isDone: { $first: '$isDone' },
                },
            },
            { $sort: { isExpired: 1, isDone: 1, isReady: -1, createdAt: 1 } },
        ]);

        return orders;
    } catch (error) {
        throw error;
    }
};
