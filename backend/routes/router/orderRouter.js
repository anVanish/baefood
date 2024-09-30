const express = require("express");
const router = express.Router();
const {
    myOrders,
    addMyOrder,
    deleteMyOrder,
    getServeTime,
    setReadyOrder,
    setDoneOrder,
    reOrder,
} = require("../../app/controllers/orderController");
const { authAdmin, authToken } = require("../../middlewares/authentication");

router.use(authToken);
router.get("/serveTime", getServeTime);
router.get("/", myOrders);
router.post("/", addMyOrder);
router.post("/:orderId", reOrder);
router.delete("/:orderId", deleteMyOrder);

router.use(authAdmin);
router.patch("/:orderId/ready", setReadyOrder);
router.patch("/:orderId/done", setDoneOrder);

module.exports = router;
