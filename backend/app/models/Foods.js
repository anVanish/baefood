const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const Foods = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    chef: {type: String, required: true},
    imageLink: {type: String, required: true},
    categoryId: {type: ObjectId, required: true, ref: 'categories'}
}, {
    timestamps: true,
})

module.exports = mongoose.model('foods', Foods)