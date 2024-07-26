const express = require('express')
const router = express.Router()
const {listCategories, addCategory, deleteCategory, updateCategory} = require('../../app/controllers/categoryController')
const {authToken, authAdmin} = require('../../middlewares/authentication')

router.get('/', listCategories)

router.use(authToken, authAdmin)
router.post('/', addCategory)
router.put('/:categoryId', updateCategory)
router.delete('/:categoryId', deleteCategory)

module.exports = router