const { getCart, addProductToCart, removeProductFromCart, clearCart, updateCart, clearCartAfterPayment } = require('../../controller/cartControllers')
const { userAuth } = require('../../middleware/userAuth')

const cartRouter = require('express').Router()

cartRouter.get('/get-cart', userAuth, getCart)
cartRouter.post('/add-to-cart', userAuth, addProductToCart)
cartRouter.delete('/remove-from-cart', userAuth, removeProductFromCart)
cartRouter.delete('/clear-cart', userAuth, clearCart)
cartRouter.put('/update-cart', userAuth, updateCart);
cartRouter.post('/clear-cart-after-payment', userAuth, clearCartAfterPayment);

module.exports = cartRouter