const adminRouter = require('./adminRoutes')
const productRouter = require('./productRoutes')
const sellerRouter = require('./sellerRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use('/user',userRouter)
v1Router.use('/admin',adminRouter)
v1Router.use('/seller',sellerRouter)
v1Router.use('/product',productRouter)

module.exports = v1Router