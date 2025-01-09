const { loginSeller, registerSeller } = require('../../controller/sellerControllers')

const sellerRouter = require('express').Router()

sellerRouter.post('/signup', registerSeller)
sellerRouter.post('/login', loginSeller)

module.exports = sellerRouter