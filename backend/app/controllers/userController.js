const Users = require('../models/Users');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { encodeData } = require('../utils/tokenService');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) throw new ApiError('Email not found', 404);
        if (!bcrypt.compareSync(password, user.password))
            throw new ApiError('Password not correct', 400);

        const token = encodeData({ _id: user._id, isAdmin: user.isAdmin });
        const resUser = user.toObject();
        delete resUser.password;

        res.json(
            new ApiResponse().setMultiData(['user', 'token'], [resUser, token])
        );
    } catch (error) {
        next(error);
    }
};
