const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, productCategory, productNewArrival, getTotalProductCount } = require('../../controller/productControllers')
const { upload } = require('../../middleware/multer')
const { sellerAuth } = require('../../middleware/sellerAuth')

const productRouter = require('express').Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.get('/get-product/:id', getProductById)
productRouter.post('/create-product', sellerAuth, upload.single('image'), createProduct)
productRouter.put('/update-product/:id',sellerAuth, updateProduct)
productRouter.delete('/delete-product/:id',sellerAuth, deleteProduct)
productRouter.get('/products/:category', productCategory)
productRouter.get('/get-new-arrivals', productNewArrival);
productRouter.get('/total-products', sellerAuth, getTotalProductCount);

module.exports = productRouter
