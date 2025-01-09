const { loginSeller, registerSeller, sellerProfile } = require('../../controller/sellerControllers')
const { sellerAuth } = require('../../middleware/sellerAuth')

const sellerRouter = require('express').Router()

sellerRouter.post('/signup', registerSeller)
sellerRouter.post('/login', loginSeller)
sellerRouter.get('/profile', sellerAuth, sellerProfile)

module.exports = sellerRouter