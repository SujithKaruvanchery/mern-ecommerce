const OrderDB = require('../model/orderModel')
const ProductDB = require('../model/productModel')

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

        const processedOrders = orders.map(order => {
            const totalPrice = order.items.reduce((total, item) => 
                total + (item.productId?.price || 0) * (item.quantity || 1), 0
            );

            return {
                _id: order._id,
                userId: order.userId,
                items: order.items.map(item => ({
                    productId: item.productId,
                    price: item.productId?.price || 0,
                    quantity: item.quantity
                })),
                totalPrice,
                orderStatus: order.orderStatus,
                createdAt: order.createdAt
            };
        });

        res.json(processedOrders);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllOrdersBySeller = async (req, res) => {
    try {
        const sellerId = req.user.id;
        console.log("Seller ID from token:", sellerId);

        const orders = await OrderDB.find()
            .populate({
                path: 'items.productId',
                select: 'title price seller',
                populate: { path: 'seller', select: '_id' }
            })
            .populate('userId', 'name email');

        const sellerOrders = orders.filter(order =>
            order.items.some(item => item.productId.seller?._id.toString() === sellerId)
        );

        console.log("Orders matching seller ID:", sellerOrders);

        res.status(200).json({
            message: "Orders successfully retrieved for seller",
            data: sellerOrders,
        });
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "Shipping Progress",
            "Out for Dispatch",
            "Delivered Successfully"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "The provided status is not valid" });
        }

        const currentOrder = await OrderDB.findById(orderId);
        if (!currentOrder) {
            return res.status(404).json({ message: "Order with the given ID does not exist" });
        }

        if (currentOrder.orderStatus === "Canceled") {
            return res.status(400).json({ message: "Cannot update a canceled order" });
        }

        if (!currentOrder.verifiedByAdmin) {
            return res.status(400).json({ message: "Order must be verified by admin before updating status" });
        }

        const statusOrder = {
            "Shipping Progress": 2,
            "Out for Dispatch": 3,
            "Delivered Successfully": 4,
        };

        if (statusOrder[status] < statusOrder[currentOrder.orderStatus]) {
            return res.status(400).json({ message: "Cannot move order status backward" });
        }

        const updatedOrder = await OrderDB.findByIdAndUpdate(
            orderId,
            { orderStatus: status },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "The order status has been successfully updated", order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const verifyOrderByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { approvalStatus } = req.body;

        const order = await OrderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.verifiedByAdmin) {
            return res.status(400).json({ message: "Order is already verified" });
        }

        if (approvalStatus === "Canceled") {
            order.orderStatus = "Canceled";
            order.canceledAt = new Date();
            await order.save();
            return res.status(200).json({ message: "Order has been canceled by admin", order });
        }

        if (approvalStatus === "Approved") {
            order.verifiedByAdmin = true;
            order.adminVerifiedAt = new Date();
            order.orderStatus = "Verified by Admin";
            await order.save();
            return res.status(200).json({ message: "Order successfully verified by admin", order });
        }

        return res.status(400).json({ message: "Invalid approval status" });

    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        console.log(`Received request to cancel order: ${orderId} for user: ${userId}`);

        const order = await OrderDB.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found or does not belong to you" });
        }

        const nonCancelableStatuses = ["Shipping Progress", "Out for Dispatch", "Delivered Successfully"];
        if (nonCancelableStatuses.includes(order.orderStatus)) {
            return res.status(400).json({ message: "Order cannot be canceled at this stage" });
        }

        for (const item of order.items) {
            await ProductDB.findByIdAndUpdate(
                item.productId,
                { $inc: { stockQuantity: item.quantity } },
                { new: true }
            );
        }

        const updatedOrder = await OrderDB.findByIdAndUpdate(
            orderId,
            { 
                orderStatus: "Canceled", 
                paymentStatus: "Refunded",
                canceledAt: new Date(),
                totalPrice: order.totalPrice
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Order successfully canceled, stock restored",
            order: updatedOrder
        });

    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

const trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await OrderDB.findOne({ _id: orderId, userId }).select("orderStatus");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status retrieved successfully", status: order.orderStatus });
    } catch (error) {
        console.error("Error tracking order:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports = { getOrdersByUserId, getAllOrders, getAllOrdersBySeller,updateOrderStatus,verifyOrderByAdmin,cancelOrder,trackOrder }