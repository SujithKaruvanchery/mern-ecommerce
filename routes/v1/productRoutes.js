const { getAllProducts, getProductById, createProduct } = require('../../controller/productControllers')
const { upload } = require('../../middleware/multer')
const { sellerAuth } = require('../../middleware/sellerAuth')

const productRouter = require('express').Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.get('/get-product/:id', getProductById)
productRouter.post('/create-product', sellerAuth, upload.single('image'), createProduct)

module.exports = productRouter
