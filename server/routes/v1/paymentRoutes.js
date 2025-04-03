// const stripe = require("stripe")(process.env.Stripe_Secret_Api_Key);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const client_domain = process.env.CLIENT_DOMAIN;
const { userAuth } = require("../../middleware/userAuth");
const OrderDB = require('../../model/orderModel')

const paymentRouter = require('express').Router();

// paymentRouter.post('/create-checkout-session', userAuth, async (req, res, next) => {
//     try {
//         const { products } = req.body;

//         const lineItems = products.map((product) => ({
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: product?.productId?.title,
//                     images: [product?.productId?.image],
//                 },
//                 unit_amount: Math.round(product?.productId?.price * 100),
//             },
//             quantity: product?.quantity || 1,
//         }));

//         const totalAmount = products.reduce(
//             (sum, product) => sum + product?.productId?.price * (product?.quantity || 1),
//             0
//         );

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: `${client_domain}/user/payment/success`,
//             cancel_url: `${client_domain}/user/payment/cancel`,
//         });

//         const order = new OrderDB({
//             userId: req.user.id,
//             items: products.map((product) => ({
//                 productId: product.productId,
//                 name: product?.productId?.title,
//                 price: product?.productId?.price,
//                 quantity: product?.quantity || 1,
//             })),

//             totalAmount,
//             orderStatus: 'Order Received',
//         });

//         await order.save();

//         res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//         console.error(error);
//         res
//             .status(error.status || 500)
//             .json({ error: error.message || 'Internal server error' });
//     }
// });

paymentRouter.post('/create-checkout-session', userAuth, async (req, res, next) => {
    try {
        console.log("Received Request Body:", JSON.stringify(req.body, null, 2));

        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products array is missing or empty" });
        }

        const lineItems = products.map((product) => {
            console.log("Processing Product:", JSON.stringify(product, null, 2));

            if (!product?.price || isNaN(product?.price)) {
                throw new Error(`Invalid price value: ${product?.price}`);
            }

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product?.title || "Unknown Product",
                        images: [product?.image || ""],
                    },
                    unit_amount: Math.round(Number(product?.price) * 100),
                },
                quantity: product?.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });
        console.log("Client Domain:", client_domain);
        res.json({ success: true, sessionId: session.id });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
});


paymentRouter.get('/session-status', async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || 'internal server error');
    }
});


module.exports = paymentRouter;



