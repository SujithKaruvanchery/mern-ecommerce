const CartDB = require('../model/cartModel')
const ProductDB = require('../model/productModel')

const getCart = async (req, res) => {
    try {
        const userId = req.user.id
        console.log("=======userid", userId)

        const cart = await CartDB.findOne({ userId }).populate('products.productId')
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found' })
        }
        res.status(200).json({ message: 'Cart Fetched Successfully', data: cart })
        console.log("=======cart", cart)

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
}

module.exports = {getCart}