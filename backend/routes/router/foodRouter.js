const express = require('express')
const {listFood, addFood, updateFood, deleteFood} = require('../../app/controllers/foodController')
const { authToken, authAdmin } = require('../../middlewares/authentication')
const router = express.Router()

router.get('/', listFood)

router.use(authToken, authAdmin)
router.post('/', addFood)
router.put('/:foodId', updateFood)
router.delete('/:foodId', deleteFood)

module.exports = router