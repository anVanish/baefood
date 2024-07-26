const ApiResponse = require("../app/utils/ApiResponse")


exports.notFoundErrorHandling = (req, res, next) => {
    res.status(404).json(
        new ApiResponse()
            .setError('The requested resource was not found on this server')
    )
}