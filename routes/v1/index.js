const adminRouter = require('./adminRoutes')
const sellerRouter = require('./sellerRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use('/user',userRouter)
v1Router.use('/admin',adminRouter)
v1Router.use('/seller',sellerRouter)

module.exports = v1Router