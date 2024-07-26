const express = require('express')
const router = express.Router()
const {myOrders, addMyOrder, deleteMyOrder, getServeTime} = require('../../app/controllers/orderController')
const {authAdmin, authToken} = require('../../middlewares/authentication')

router.use(authToken)
router.get('/serveTime', getServeTime)
router.get('/', myOrders)
router.post('/', addMyOrder)
router.delete('/:orderId', deleteMyOrder)

module.exports = router