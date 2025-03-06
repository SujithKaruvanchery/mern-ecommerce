const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, productCategory, productNewArrival, getTotalProductCount, updateProductStock, updateProductByAdmin, deleteProductByAdmin } = require('../../controller/productControllers')
const { getSellerProducts } = require('../../controller/sellerControllers')
const { adminAuth } = require('../../middleware/adminAuth')
const { upload } = require('../../middleware/multer')
const { sellerAuth } = require('../../middleware/sellerAuth')

const productRouter = require('express').Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.get('/get-product/:id', getProductById)
productRouter.post('/create-product', sellerAuth, upload.single('image'), createProduct)
productRouter.put('/update-product/:id', sellerAuth, updateProduct)
productRouter.delete('/delete-product/:id', sellerAuth, deleteProduct)
productRouter.get('/products/:category', productCategory)
productRouter.get('/get-new-arrivals', productNewArrival);
productRouter.get('/total-products', sellerAuth, getTotalProductCount);
productRouter.post('/update-stock', sellerAuth, updateProductStock);
productRouter.post('/update-product-by-admin/:id', adminAuth, updateProductByAdmin);
productRouter.delete('/delete-product-by-admin/:id', sellerAuth, deleteProductByAdmin)
productRouter.get('/seller/products', sellerAuth, getSellerProducts)

module.exports = productRouter
