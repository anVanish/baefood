const Orders = require('../models/Orders');
const mongoose = require('mongoose');

exports.listOrdersByUserId = async (userId) => {
    try {
        const orders = Orders.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
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
                    isDone: { $first: '$isDone' },
                },
            },
            { $sort: { isExpired: 1, isDone: 1 } },
        ]);

        return orders;
    } catch (error) {
        throw error;
    }
};
