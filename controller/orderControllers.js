const OrderDB = require('../model/orderModel')

// const getOrdersByUserId = async (req, res) => {
//     try {
//         const id = req.user.id;
//         console.log('Retrieving orders for user ID:', id);

//         const orders = await OrderDB.find({ id })
//             .populate('items.productId', 'title price image')
//             .exec();

//         console.log('Successfully retrieved orders:', orders);
//         res.status(200).json({
//             message: 'Orders successfully retrieved',
//             data: orders,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
//     }
// };

const getOrdersByUserId = async (req, res) => {
    try {
        const id = req.user.id;
        console.log("User ID from token:", id);

        const orders = await OrderDB.find({ userId: id })
            .populate("items.productId", "title price image")
            .exec();

        console.log("Retrieved orders:", orders);
        res.status(200).json({
            message: "Orders successfully retrieved",
            data: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
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

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['Order Received',
            'Shipping Progress',
            'Out for Dispatch',
            'Delivered Successfully'].includes(status)) {
            return res.status(400).json({ message: 'The provided status is not valid' });
        }

        const updatedOrder = await OrderDB.findByIdAndUpdate(
            orderId,
            { orderStatus: status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order with the given ID does not exist' });
        }

        res.status(200).json({ message: 'The order status has been successfully updated', order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const verifyOrderByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await OrderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.verifiedByAdmin) {
            return res.status(400).json({ message: "Order is already verified" });
        }

        order.verifiedByAdmin = true;
        order.adminVerifiedAt = new Date();
        order.orderStatus = "Verified by Admin";

        await order.save();

        res.status(200).json({
            message: "Order successfully verified by admin",
            order,
        });
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};

const placeOrderAfterVerification = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await OrderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!order.verifiedByAdmin) {
            return res.status(400).json({ message: "Order must be verified by admin before placing" });
        }

        if (order.orderPlaced) {
            return res.status(400).json({ message: "Order is already placed" });
        }

        order.orderPlaced = true;
        order.orderStatus = "Placed";

        await order.save();

        res.status(200).json({
            message: "Order successfully placed after admin verification",
            order,
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};


module.exports = { getOrdersByUserId, getAllOrders, getAllOrdersBySeller,updateOrderStatus,verifyOrderByAdmin,placeOrderAfterVerification }