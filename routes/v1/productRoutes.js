const { getAllProducts, getProductById } = require('../../controller/productControllers')

const productRouter = require('express').Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.get('/get-product/:id',getProductById)

module.exports = productRouter