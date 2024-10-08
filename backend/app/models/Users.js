const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
},{
    timestamps: true,
})

module.exports = mongoose.model('users', Users)