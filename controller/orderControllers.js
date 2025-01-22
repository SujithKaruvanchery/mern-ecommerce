const OrderDB = require('../model/orderModel')

const getOrdersByUserId = async (req, res) => {
    try {
        const id = req.user.id;
        console.log('Retrieving orders for user ID:', id);

        const orders = await OrderDB.find({ id })
            .populate('items.productId', 'title price image')
            .exec();

        console.log('Successfully retrieved orders:', orders);
        res.status(200).json({
            message: 'Orders successfully retrieved',
            data: orders,
        });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await OrderDB.find()
            .populate('userId', 'name email')
            .populate('items.productId', 'title price');

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllOrdersBySeller = async (req, res) => {
    try {
        const orders = await OrderDB.find()
            .populate('userId', 'name email')
            .populate('items.productId', 'title price');

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};



module.exports = { getOrdersByUserId, getAllOrders, getAllOrdersBySeller }