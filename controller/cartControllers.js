const CartDB = require('../model/cartModel')
const ProductDB = require('../model/productModel')

const getCart = async (req, res) => {
    try {
        const userId = req.user.id

        const cart = await CartDB.findOne({ userId }).populate('products.productId')
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found' })
        }
        res.status(200).json({ message: 'Cart Fetched Successfully', data: cart })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
}

// const addProductToCart = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { productId, quantity } = req.body;

//         if (!productId || !quantity || quantity <= 0) {
//             return res.status(400).json({ message: 'Please provide a valid productId and quantity' });
//         }

//         const product = await ProductDB.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found in the database' });
//         }

//         let cart = await CartDB.findOne({ userId });
//         if (!cart) {
//             cart = new CartDB({ userId, products: [] });
//         }

//         const productExists = cart.products.some((item) => item.productId.equals(productId));
//         if (productExists) {
//             return res.status(400).json({ message: 'Product already exists in the cart' });
//         }

//         cart.products.push({
//             productId,
//             quantity,
//             price: product.price,
//         });

//         cart.calculateTotalPrice();

//         await cart.save();

//         res.status(200).json({ message: 'Product added to cart successfully', cart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message || 'Internal Server Error' });
//     }
// };

// const addProductToCart = async (req, res) => {
//     try {
//         const userId = req.user.id
//         console.log("=======userid", userId)
//         const { productId } = req.body
//         console.log("=======productid", productId)

//         if (!productId) {
//             return res.status(404).json({ message: 'Please provide a valid productId' })
//         }

//         const product = await ProductDB.findById(productId)
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found in the database' })
//         }
//         console.log("=======product", product)

//         let cart = await CartDB.findOne({ userId })
//         if (!cart) {
//             cart = new CartDB({ userId, products: [] })
//         }

//         const productExists = cart.products.some((item) => item.productId.equals(productId))
//         if (productExists) {
//             return res.status(400).json({ message: 'Product already exists in the cart' })
//         }
//         console.log("=======productexists", productExists)

//         cart.products.push({
//             productId,
//             price: product.price
//         })

//         cart.calculateTotalPrice()

//         await cart.save()

//         res.status(200).json({ message: 'Product added to cart successfully', cart })

//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
//     }
// }

const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Please provide a valid productId' });
        }

        if (!size || !["XS", "S", "M", "L", "XL"].includes(size.toUpperCase())) {
            return res.status(400).json({ message: 'Please provide a valid size (XS, S, M, L, XL)' });
        }

        const product = await ProductDB.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in the database' });
        }

        let cart = await CartDB.findOne({ userId });
        if (!cart) {
            cart = new CartDB({ userId, products: [] });
        }

        const existingProduct = cart.products.find((item) =>
            item.productId.equals(productId) && item.size === size
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                productId,
                size: size.toUpperCase(),
                price: product.price,
                quantity: 1
            });
        }

        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart });

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};


const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cart = await CartDB.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        const productExists = cart.products.some((item) => item.productId.equals(productId));
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        cart.products = cart.products.filter((item) => !item.productId.equals(productId));

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ message: 'Product removed from the cart successfully', data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await CartDB.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        cart.products = [];
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: 'Your cart has been cleared successfully', data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined || quantity < 1) {
            return res.status(400).json({ message: 'Please provide a valid productId and quantity greater than 0' });
        }

        const cart = await CartDB.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        cart.products[productIndex].quantity = quantity;

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', data: cart });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const clearCartAfterPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const paymentStatus = req.body.paymentStatus;

        if (paymentStatus !== 'success') {
            return res.status(400).json({ message: 'Payment failed, cart not cleared.' });
        }

        const cart = await CartDB.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        cart.products = [];
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: 'Your cart has been cleared successfully after payment', data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { getCart, addProductToCart, removeProductFromCart, clearCart, updateCart,clearCartAfterPayment }