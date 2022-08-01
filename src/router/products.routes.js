/* Módulo de routes para manejo de productos */

const express = require('express')
const router = express.Router()
const {Admin, getProduct, getProductId, postProduct, putProduct, deleteProduct} = require('../controllers/products.controller')

router.get('/', getProduct)
router.get('/:id', getProductId)
router.post('/', Admin, postProduct)
router.put('/:id', Admin, putProduct)
router.delete('/:id', Admin, deleteProduct)

const productRouter = router
module.exports = {productRouter}
