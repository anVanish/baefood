const jwt = require('jsonwebtoken')

exports.encodeData = (data, expiresIn = '14d') => {
    return jwt.sign({data}, process.env.SECRET_KEY, {expiresIn})
}

exports.decodeToken = (token) => {
    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(error){
        return null
    }
}