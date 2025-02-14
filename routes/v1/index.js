const adminRouter = require('./adminRoutes')
const cartRouter = require('./cartRoutes')
const orderRouter = require('./orderRoutes')
const paymentRouter = require('./paymentRoutes')
const productRouter = require('./productRoutes')
const reviewRouter = require('./reviewRoutes')
const sellerRouter = require('./sellerRoutes')
const userRouter = require('./userRoutes')
const wishlistRouter = require('./wishlistRoutes')

const v1Router = require('express').Router()

v1Router.use('/user',userRouter)
v1Router.use('/admin',adminRouter)
v1Router.use('/seller',sellerRouter)
v1Router.use('/product',productRouter)
v1Router.use('/cart',cartRouter)
v1Router.use('/review',reviewRouter)
v1Router.use('/payment',paymentRouter)
v1Router.use('/order',orderRouter)
v1Router.use('/wishlist',wishlistRouter)

module.exports = v1Router