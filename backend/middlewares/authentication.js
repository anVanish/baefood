const ApiError = require('../app/utils/ApiError');
const { decodeToken } = require('../app/utils/tokenService');

exports.authToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(new ApiError('Missing token', 401));

    const decodedToken = decodeToken(token.split(' ')[1]);
    if (!decodedToken || !decodedToken.data || !decodedToken.data._id)
        return next(new ApiError('Token invalid', 401));

    req.user = decodedToken.data;
    next();
};

exports.authAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) return next(new ApiError('Only admin can access'));
    next();
};
