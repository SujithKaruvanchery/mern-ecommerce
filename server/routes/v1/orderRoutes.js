const { getOrdersByUserId, getAllOrders, getAllOrdersBySeller, updateOrderStatus, verifyOrderByAdmin, cancelOrder, trackOrder } = require("../../controller/orderControllers");
const { adminAuth } = require("../../middleware/adminAuth");
const { sellerAuth } = require("../../middleware/sellerAuth");
const { userAuth } = require("../../middleware/userAuth");

const orderRouter = require("express").Router();

orderRouter.get('/get-order', userAuth, getOrdersByUserId)
orderRouter.get('/get-all-orders', adminAuth, getAllOrders)
orderRouter.get('/get-all-orders-seller', sellerAuth, getAllOrdersBySeller)
orderRouter.put('/orders/:orderId/status', sellerAuth, updateOrderStatus)
orderRouter.put("/admin/verify-order/:orderId", adminAuth, verifyOrderByAdmin);
orderRouter.patch('/orders/:orderId/cancel-order', userAuth, cancelOrder);
orderRouter.get('/orders/:orderId/track-order', userAuth, trackOrder);

module.exports = orderRouter;
