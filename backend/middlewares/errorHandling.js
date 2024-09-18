const ApiResponse = require('../app/utils/ApiResponse')

exports.errorHandling = (err, req, res, next) => {
    let status = err.statusCode || 500

    console.log(`Error occured: ${err} `)

    res.status(status).json(new ApiResponse()
        .setError(err.message || 'Interval server error')
    )
}