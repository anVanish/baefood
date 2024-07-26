const express = require('express')
const router = express.Router()
const {getCart, deleteFromCart, addToCart} = require('../../app/controllers/cartController')
const {authToken} = require('../../middlewares/authentication')

router.use(authToken)
router.get('/', getCart)
router.post('/:foodId', addToCart)
router.delete('/:foodId', deleteFromCart)

module.exports = router