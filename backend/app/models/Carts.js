const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const Carts = new mongoose.Schema({
    userId: {type: ObjectId, required: true, ref: 'users'},
    foodId: {type: ObjectId, required: true, ref: 'foods'},
}, {
    timestamps: true,
})

module.exports = mongoose.model('carts', Carts)
