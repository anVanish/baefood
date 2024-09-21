const express = require('express');
const router = express.Router();
const {
    myOrders,
    addMyOrder,
    deleteMyOrder,
    getServeTime,
    setReadyOrder,
    setDoneOrder,
} = require('../../app/controllers/orderController');
const { authAdmin, authToken } = require('../../middlewares/authentication');

router.use(authToken);
router.get('/serveTime', getServeTime);
router.get('/', myOrders);
router.post('/', addMyOrder);
router.delete('/:orderId', deleteMyOrder);

router.use(authAdmin);
router.patch('/:orderId/ready', setReadyOrder);
router.patch('/:orderId/done', setDoneOrder);

module.exports = router;
