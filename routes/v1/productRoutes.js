const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../../controller/productControllers')
const { upload } = require('../../middleware/multer')
const { sellerAuth } = require('../../middleware/sellerAuth')

const productRouter = require('express').Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.get('/get-product/:id', getProductById)
productRouter.post('/create-product', sellerAuth, upload.single('image'), createProduct)
productRouter.put('/update-product/:id', updateProduct)
productRouter.delete('/delete-product/:id', deleteProduct)


module.exports = productRouter
