const express = require('express')
const { login } = require('../../app/controllers/userController')
const router = express.Router()

router.post('/login', login)

module.exports = router