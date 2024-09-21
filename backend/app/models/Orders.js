const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Orders = new mongoose.Schema(
    {
        userId: { type: ObjectId, required: true, ref: 'users' },
        foodIds: [{ type: ObjectId, required: true, ref: 'foods' }],
        serveDate: { type: Date, required: true },
        serveTime: {
            type: String,
            required: true,
            enum: ['breakfast', 'lunch', 'dinner'],
        },
        note: { type: String },
        isReady: { type: Boolean, default: false },
        isDone: { type: Boolean, default: false },
        isExpired: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('orders', Orders);
